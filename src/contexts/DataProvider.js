import React, { useContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';
import useFetch from '../hooks/useFetch';
import { DATA_LOSS_WARNING, MODAL_CLOSE_MESSAGE } from '../consts/strings';
import { useNavigate } from 'react-router-dom';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function parseUrlQuery(url) {
  let queryString = url.split('?');
  const query = {};

  if (queryString.length > 1) {
    queryString = queryString[1];
    queryString.split('&').forEach((queryItem) => {
      const querySplit = queryItem.split('=');
      const key = querySplit[0];
      const value = querySplit[1];

      query[key] = value;
    });
  }

  return query;
}

export default function DataProvider({ children }) {
  // data from servers
  const [boards, setBoards] = useState({});
  const [links, setLinks] = useState({});
  // const [categories, setCategories] = useState([]);

  // GET /boards/ (my boards)
  const [myBoardIds, setMyBoardIds] = useState([]); // paginated (nested arrays)
  const [myBoardsPaginationInfo, setMyBoardsPaginationInfo] = useState({
    count: 0,
    previous: null,
    current: null,
    next: null,
  });

  // GET /links/ (explore)
  const [exploreLinkIds, setExploreLinkIds] = useState([]); // paginated (nested arrays)
  const [explorePaginationInfo, setExplorePaginationInfo] = useState({
    count: 0,
    previous: null,
    current: null,
    next: null,
  });

  // Manage window resize event
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

  const handleWindowResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500); // event fires only once every 500ms

  // ROUTEMODAL
  const [routeModalSize, setRouteModalSize] = useState('fullscreen');
  const handleRouteModalClose = (event = {}, confirmBeforeClose = false) => {
    // console.log(confirmBeforeClose);
    const confirmMsg = MODAL_CLOSE_MESSAGE + ' ' + DATA_LOSS_WARNING;
    const confirmed = confirmBeforeClose ? window.confirm(confirmMsg) : true;
    if (confirmed) navigate(-1);
  };

  // data updaters
  const updateBoards = (processedBoards, pageNum = 0) => {
    // processedBoards must be in object form
    setBoards((prev) => {
      const prevBoards = { ...prev }; // make a copy

      // in case of paginated result fetch, remove all cached data
      // that is in a later page than the current page
      if (pageNum > 0) {
        for (const boardId in prevBoards) {
          // check if there is pagination info on the cached data
          // if so, check page number
          if (
            prevBoards[boardId]?.page &&
            prevBoards[boardId].page >= pageNum
          ) {
            prevBoards[boardId] = null;
          }
        }
      }

      const newBoards = {}; // final return value

      // remove all null entries
      for (const boardId in prevBoards) {
        if (prevBoards[boardId]) {
          newBoards[boardId] = prevBoards[boardId];
        }
      }

      // append newly processed boards
      return { ...prevBoards, ...processedBoards };
    });
  };

  const updateLinks = (processedLinks, pageNum = 0, boardIds = []) => {
    // processedLinks must be in object form
    setLinks((prev) => {
      const prevLinks = { ...prev }; // make a copy

      // in case of paginated result fetch, remove all cached data
      // that is in a later page than the current page
      if (pageNum && pageNum > 0) {
        for (const linkId in prevLinks) {
          // check if there is pagination info on the cached data
          // if so, check page number
          if (prevLinks[linkId]?.page && prevLinks[linkId].page >= pageNum) {
            prevLinks[linkId] = null;
          }
        }
      }

      // remove all links associated to this board
      // to handle links deleted from this board
      if (boardIds.length && boardIds.length > 0) {
        for (const linkId in prevLinks) {
          if (boardIds.includes(prevLinks[linkId].board)) {
            prevLinks[linkId] = null;
          }
        }
      }

      const newLinks = {}; // final return value

      // remove all null entries
      for (const linkId in prevLinks) {
        if (prevLinks[linkId] !== null) {
          newLinks[linkId] = prevLinks[linkId];
        }
      }

      // append newly processed links
      return { ...newLinks, ...processedLinks };
    });
  };

  // FETCHERS
  // FETCHER: My boards
  const [fetchMyBoardsState, fetchMyBoards] = useFetch('GET', '/boards/');
  useEffect(() => {
    // callback after my boards are fetched
    if (!fetchMyBoardsState.loading && fetchMyBoardsState.res?.data) {
      // store pagination info
      const current = fetchMyBoardsState.fetchArgs.query?.page;
      const { count, next, previous, results } = fetchMyBoardsState.res.data;

      if (!count || !next || !previous || !results) return;

      setMyBoardsPaginationInfo({
        count,
        previous,
        current,
        next,
      });

      // process boards and links
      const currentTime = new Date().getTime();
      const processedBoards = {};
      const processedLinks = {};
      const boardIds = []; // store board ids in myBoardIds
      results.forEach((board) => {
        processedBoards[board.board_id] = {
          ...board,
          links: board.links.map((link) => link.link_id), // store only link IDs
          page: current, // store pagination information,
          lastUpdate: currentTime, // (cache) last fetched time
        };

        board.links.forEach((link) => {
          processedLinks[link.link_id] = {
            ...link,
            lastUpdate: currentTime,
          };
        });

        boardIds.push(board.board_id);
      });

      setMyBoardIds((prev) => {
        // discard all pages later than the current one loading
        // in case of out of order page fetch, check length of myBoardIds first
        const newMyBoardIds = prev.slice(
          0,
          current <= prev.length ? current : prev.length
        );

        // make sure that newMyBoardIds[current - 1] exists
        while (newMyBoardIds.length < current) {
          newMyBoardIds.push([]);
        }

        // append the board IDs
        newMyBoardIds[current - 1] = boardIds;
        return newMyBoardIds;
      });

      // store processed boards and links
      updateBoards(processedBoards);
      updateLinks(processedLinks, 0, [boardIds]);
    } else if (fetchMyBoardsState.err) {
      // TODO Error handling
      // TODO invalid page (404)
    }
    // eslint-disable-next-line
  }, [fetchMyBoardsState]);

  // fetch individual board
  const [fetchBoardState, fetchBoard] = useFetch('GET', '/boards/:id/');
  useEffect(() => {
    const { loading, res, err } = fetchBoardState;
    if (!loading) {
      if (res) {
        const boardInfo = res?.data;
        if (boardInfo) {
          const processedLinks = {};
          const processedBoards = {};
          const currentTime = new Date().getTime();

          // process board
          processedBoards[boardInfo.board_id] = {
            ...boardInfo,
            links: boardInfo.links.map((link) => link.link_id),
            lastUpdate: currentTime,
          };

          // process boards
          boardInfo.links.forEach((link) => {
            processedLinks[link.link_id] = {
              ...link,
              lastUpdate: currentTime,
            };
          });

          updateBoards(processedBoards);
          updateLinks(processedLinks, 0, [boardInfo.board_id]);
        }
      } else if (err) {
      }
    }
  }, [fetchBoardState]);

  // Fetch Explore links
  const [exploreFetchState, fetchExploreLinks] = useFetch('GET', '/links/');
  useEffect(() => {
    const { loading, res, err, fetchArgs } = exploreFetchState;
    if (!loading) {
      if (res?.data) {
        // Store pagination info
        const current = fetchArgs?.query?.page || 1;
        const { count, previous, next, results } = res.data;
        setExplorePaginationInfo({
          count,
          previous,
          next,
          current,
        });

        // Process links
        const boardIdsToFetch = [];
        const linkIds = [];
        const processedLinks = {};
        const currentTime = new Date().getTime();
        results.forEach((link) => {
          processedLinks[link.link_id] = {
            ...link,
            page: current,
            lastUpdate: currentTime,
          };
          linkIds.push(link.link_id);
          boardIdsToFetch.push(link.board);
        });

        // store results
        setExploreLinkIds((prev) => {
          // discard all pages later than the current one loading
          // in case of out of order page fetch, check length of exploreLinkIds first
          const newExploreLinkIds = prev.slice(
            0,
            current <= prev.length ? current : prev.length
          );

          // make sure that exploreLinkIds[current - 1] exists
          while (newExploreLinkIds.length < current) {
            newExploreLinkIds.push([]);
          }

          // append the link IDs
          newExploreLinkIds[current - 1] = linkIds;
          return newExploreLinkIds;
        });

        // store processed links
        updateLinks(processedLinks, current);
      } else if (err) {
        // TODO Error handling
        // Invalid page (404)
      }
    }
  }, [exploreFetchState]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line
  }, []);

  // let isAtLandingPage = useMatch('/welcome/*');

  // things to automatically do after login
  // useEffect(() => {
  //   if (
  //     isUserProfileValid(userProfile) &&
  //     isRefreshTokenValid &&
  //     !isAtLandingPage
  //   ) {
  //     // fetchCategories();
  //   }
  //   // eslint-disable-next-line
  // }, [userProfile, isRefreshTokenValid]);

  const value = {
    boards,
    links,
    myBoardIds,
    myBoardsPaginationInfo,
    fetchMyBoardsState,
    fetchMyBoards,
    exploreLinkIds,
    explorePaginationInfo,
    exploreFetchState,
    fetchExploreLinks,
    fetchBoardState,
    fetchBoard,
    windowSize,
    handleRouteModalClose,
    routeModalSize,
    setRouteModalSize,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
