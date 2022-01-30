import React, { useContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';
import useFetch from '../hooks/useFetch';
import { useAuth } from './AuthProvider';
import { useMatch } from 'react-router-dom';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider({ children }) {
  const { userProfile, isUserProfileValid, isRefreshTokenValid } = useAuth();

  // data from servers
  const [boards, setBoards] = useState({});
  const [links, setLinks] = useState({});
  const [categories, setCategories] = useState([]);

  // GET /boards/my
  const [myBoardIds, setMyBoardIds] = useState([]);
  const [myBoardsCurrentPage, setMyBoardsCurrentPage] = useState(1);
  const [myBoardsTotalPageCount, setMyBoardsTotalPageCount] = useState(1);
  const [myBoardsDataCount, setMyBoardsDataCount] = useState(0);

  // Manage window resize event
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleWindowResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500); // event fires only once every 500ms

  // data updaters
  const updateBoards = (processedBoards, pageNum = 0) => {
    // processedBoards must be in array form
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

  const updateLinks = (processedLinks, pageNum = 0, boardId = 0) => {
    // processedLinks must be in array form
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
      if (boardId && boardId > 0) {
        for (const linkId in prevLinks) {
          if (prevLinks[linkId].board === boardId) {
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
  // My boards
  const [fetchMyBoardsState, fetchMyBoards] = useFetch('GET', '/boards/my');
  useEffect(() => {
    // callback after my boards are fetched
    if (!fetchMyBoardsState.loading && fetchMyBoardsState.res?.data) {
      // store pagination info
      const currentPage = fetchMyBoardsState.fetchArgs.query?.page;
      setMyBoardsCurrentPage(currentPage);
      const { dataCount, totalPageCount, results } =
        fetchMyBoardsState.res.data;
      setMyBoardsTotalPageCount(totalPageCount);

      setMyBoardsDataCount(dataCount); // update total number of my boards

      // process boards and links
      const processedBoards = {};
      const processedLinks = {};
      results.forEach((board) => {
        processedBoards[board.board_id] = {
          ...board,
          links: board.links.map((link) => link.link_id), // store only link IDs
          page: currentPage, // store pagination information
        };
        board.links.forEach((link) => {
          processedLinks[link.link_id] = link;
        });
      });

      // store board ids in myBoardIds
      const boardIds = results.map((board) => board.board_id);
      setMyBoardIds((prev) => {
        // discard all pages later than the current one loading
        // in case of out of order page fetch, check length of myBoardIds first
        const newMyBoardIds = prev.slice(
          0,
          currentPage <= prev.length ? currentPage : prev.length
        );

        // make sure that newMyBoardIds[currentPage - 1] exists
        while (newMyBoardIds.length < currentPage) {
          newMyBoardIds.push([]);
        }

        // append the board IDs
        newMyBoardIds[currentPage - 1] = boardIds;
        return newMyBoardIds;
      });

      // store processed boards and links
      updateBoards(processedBoards);
      updateLinks(processedLinks);
    }
    // eslint-disable-next-line
  }, [fetchMyBoardsState]);

  // Categories
  const [fetchCategoriesState, fetchCategories] = useFetch(
    'GET',
    '/categories/'
  );
  useEffect(() => {
    // categories callback
    if (fetchCategoriesState?.res?.data) {
      setCategories(fetchCategoriesState.res.data);
    }
  }, [fetchCategoriesState]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line
  }, []);

  let isAtLandingPage = useMatch('/welcome/*');

  // things to automatically do after login
  useEffect(() => {
    if (
      isUserProfileValid(userProfile) &&
      isRefreshTokenValid &&
      !isAtLandingPage
    ) {
      fetchCategories();
    }
    // eslint-disable-next-line
  }, [userProfile, isRefreshTokenValid]);

  const value = {
    boards,
    links,
    myBoardIds,
    myBoardsCurrentPage,
    myBoardsTotalPageCount,
    myBoardsDataCount,
    fetchMyBoardsState,
    fetchMyBoards,
    categories,
    windowSize,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
