import React, { useContext, useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import useFetch from '../hooks/useFetch';
import { DATA_LOSS_WARNING, MODAL_CLOSE_MESSAGE } from '../consts/strings';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

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
  const { userProfile } = useAuth();

  // data from servers
  const [boards, setBoards] = useState({});
  const [links, setLinks] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState({});
  // const [categories, setCategories] = useState([]);

  // GET /boards/ (my boards)
  const [myBoardIds, setMyBoardIds] = useState([]); // paginated (nested arrays)
  const [myBoardsPaginationInfo, setMyBoardsPaginationInfo] = useState({
    count: 0,
    previous: null,
    current: 0,
    next: null,
  });

  const [sharedBoardIds, setSharedBoardIds] = useState([]);
  const [sharedBoardsPaginationInfo, setSharedBoardsPaginationInfo] = useState({
    count: 0,
    previous: null,
    current: 0,
    next: null,
  });

  // GET /links/ (explore)
  const [exploreLinkIds, setExploreLinkIds] = useState([]); // paginated (nested arrays)
  const [explorePaginationInfo, setExplorePaginationInfo] = useState({
    count: 0,
    previous: null,
    current: 0,
    next: null,
  });

  const [myNotiIds, setMyNotiIds] = useState([]);
  const [myNotiPaginationInfo, setMyNotiPaginationInfo] = useState({
    count: 0,
    previous: null,
    current: 0,
    next: null,
  });

  // Manage window resize event
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [hideLinkImage, setHideLinkImage] = useState(false);

  const navigate = useNavigate();

  const handleWindowResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500); // event fires only once every 500ms

  const getDefaultBoardColor = useCallback((idx) => {
    const defaultBoardColors = [
      '#FFEEC3',
      '#B6D8FF',
      '#B0ECFF',
      '#E0D9FE',
      '#FFAEC3',
    ];
    const colorCount = defaultBoardColors.length;
    let finalIdx =
      idx >= 0 ? idx % colorCount : Math.floor(Math.random() * colorCount);
    return defaultBoardColors[finalIdx];
  }, []);

  // ROUTEMODAL
  const [routeModalSize, setRouteModalSize] = useState('fullscreen');
  const handleRouteModalClose = (event = {}, confirmBeforeClose = false) => {
    // console.log(confirmBeforeClose);
    const confirmMsg = MODAL_CLOSE_MESSAGE + ' ' + DATA_LOSS_WARNING;
    const confirmed = confirmBeforeClose ? window.confirm(confirmMsg) : true;
    if (confirmed) navigate(-1);
  };

  // NOTIFICATION MODAL
  const [isNotiModalOpen, setNotiModalOpen] = useState(false);
  const handleNotiModalClose = () => {
    setNotiModalOpen(false);
  };

  // data updaters
  const updateBoards = (processedBoards, pageNum = 0) => {
    // processedBoards must be in object form
    setBoards((prev) => {
      const newBoards = { ...prev }; // final return value

      // append newly processed boards
      for (const boardId in processedBoards) {
        if (newBoards[boardId]) {
          // only update if the incoming data is newer
          if (
            processedBoards[boardId].lastUpdate > newBoards[boardId].lastUpdate
          ) {
            // update only the incoming fields
            if (
              newBoards[boardId].links?.length >
              processedBoards[boardId].links?.length
            ) {
              // boards/my and boards/share only fetches two links from board
              // if this is the case, do not overwrite the exisisting data
              delete processedBoards[boardId].links;
            }
            newBoards[boardId] = {
              ...newBoards[boardId],
              ...processedBoards[boardId],
            };
          }
        } else {
          // if it is a new board, add to the data
          newBoards[boardId] = processedBoards[boardId];
        }
      }

      return newBoards;
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
      for (const linkId in processedLinks) {
        if (newLinks[linkId]) {
          // if already exist, then
          // update if the incoming information is newer
          if (processedLinks[linkId].lastUpdate > newLinks[linkId].lastUpdate) {
            // only update the newly incoming fields
            newLinks[linkId] = {
              ...newLinks[linkId],
              ...processedLinks[linkId],
            };
          }
          // if not, leave the original untouched
        } else {
          // if it doesn't exist, add it to links
          newLinks[linkId] = processedLinks[linkId];
        }
      }

      return newLinks;
    });
  };

  const handleBoardsFetch = useCallback(
    (fetchState, shared = false, clearBefore = false) => {
      if (!fetchState.loading && fetchState.res?.data) {
        // store pagination info
        const current = fetchState.fetchArgs.query?.page;
        const { count, next, previous, results } = fetchState.res.data;

        const newPaginationInfo = { count, previous, current, next };

        // process boards and links
        const currentTime = new Date().getTime();
        const processedBoards = {};
        const processedLinks = {};
        const boardIds = []; // store board ids in myBoardIds

        // process the boards
        if (results) {
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
        }

        const setBoardIds = (prev) => {
          // discard all pages later than the current one loading
          // in case of out of order page fetch, check length of boardIds first
          const newBoardIds = prev.slice(
            0,
            clearBefore && current <= prev.length ? current : prev.length
          );

          // make sure that newBoardIds[current - 1] exists
          while (newBoardIds.length < current) {
            newBoardIds.push([]);
          }

          // append the board IDs
          newBoardIds[current - 1] = boardIds;
          return newBoardIds;
        };

        if (!shared) {
          if (newPaginationInfo.current >= myBoardsPaginationInfo.current)
            setMyBoardsPaginationInfo(newPaginationInfo);
          setMyBoardIds(setBoardIds);
        } else {
          if (newPaginationInfo.current >= sharedBoardsPaginationInfo.current)
            setSharedBoardsPaginationInfo(newPaginationInfo);
          setSharedBoardIds(setBoardIds);
        }

        // store processed boards and links
        updateBoards(processedBoards);
        updateLinks(processedLinks, 0);
      } else if (fetchState.err) {
        // TODO Error handling
        // TODO invalid page (404)
        if (fetchState.err?.response?.status === 404) {
          if (!shared) {
            if (myBoardsPaginationInfo.current > 0) {
              setMyBoardsPaginationInfo((prev) => {
                return {
                  ...prev,
                  previous: null,
                  current: prev.current - 1,
                  next: null,
                };
              });
              setMyBoardIds((prev) => prev.slice(0, prev.length - 1));
            }
          } else {
            if (sharedBoardsPaginationInfo.current > 0) {
              setSharedBoardsPaginationInfo((prev) => {
                return {
                  ...prev,
                  previous: null,
                  current: prev.current - 1,
                  next: null,
                };
              });
              setSharedBoardIds((prev) => prev.slice(0, prev.length - 1));
            }
          }
        } // handle response code 404
      }
    },
    [myBoardsPaginationInfo, sharedBoardsPaginationInfo]
  );

  const updateNotifications = (processedNotifications) => {
    setNotifications((prev) => {
      const newNotifications = {};

      return newNotifications;
    });
  };

  const updateUsers = (userInfo) => {
    setUsers((prev) => {
      const newUsers = { ...prev };
      newUsers[userInfo.user_id] = {
        ...userInfo,
        lastUpdate: new Date().getTime(),
      };
      return newUsers;
    });
  };

  // FETCHERS
  // FETCHER: My boards
  const [fetchMyBoardsState, fetchMyBoards] = useFetch('GET', '/boards/', {
    useCache: true,
  });
  useEffect(() => {
    handleBoardsFetch(fetchMyBoardsState, false);
    // eslint-disable-next-line
  }, [fetchMyBoardsState]);

  // FETCHER: Shared boards
  const [fetchSharedBoardsState, fetchSharedBoards] = useFetch(
    'GET',
    '/boards/',
    {
      useCache: true,
    }
  );
  useEffect(() => {
    handleBoardsFetch(fetchSharedBoardsState, true);
    // eslint-disable-next-line
  }, [fetchSharedBoardsState]);

  const fetchMyBoardsRange = (pageStart, pageEnd = -1) => {
    if (pageEnd < 0) {
      pageEnd = pageStart;
      pageStart = 1;
    }

    for (let i = pageStart; i <= pageEnd; i++) {
      fetchMyBoards({ query: { page: i }, useCache: false });
    }
  };

  const fetchSharedBoardsRange = (pageStart, pageEnd = -1) => {
    if (pageEnd < 0) {
      pageEnd = pageStart;
      pageStart = 1;
    }

    for (let i = pageStart; i <= pageEnd; i++) {
      fetchSharedBoards({ query: { page: i }, useCache: false });
    }
  };

  // fetch individual board
  const [fetchBoardState, fetchBoard] = useFetch('GET', '/boards/:id/', {
    useCache: true,
  });

  const updateBoard = (boardInfo) => {
    if (!boardInfo) return;
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
  };

  useEffect(() => {
    const { loading, res } = fetchBoardState;
    if (loading || !res) return;
    const boardInfo = res?.data;
    updateBoard(boardInfo);
    // eslint-disable-next-line
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

  const [editBoardState, editBoard] = useFetch('PATCH', '/boards/:id/');
  const [deleteBoardState, deleteBoard] = useFetch('DELETE', '/boards/:id/');
  useEffect(() => {
    if (deleteBoardState.loading || !deleteBoardState.res) return;
    // Deleted board info
    const deletedBoardInfo = boards[deleteBoardState.fetchArgs.params.id];
    // is this a shared board?
    const shared = deletedBoardInfo.user !== userProfile.userId;
    // reload from deleted board's page ~ current page
    let deletedBoardPage = 1;
    if (!shared) {
      for (let i = 0; i < myBoardIds.length; i++) {
        if (myBoardIds[i].indexOf(deletedBoardInfo.board_id) >= 0) {
          deletedBoardPage = i + 1;
          break;
        }
      }
      fetchMyBoardsRange(deletedBoardPage, myBoardsPaginationInfo.current);
    } else {
      for (let i = 0; i < sharedBoardIds.length; i++) {
        if (sharedBoardIds[i].indexOf(deletedBoardInfo.board_id) >= 0) {
          deletedBoardPage = i + 1;
          break;
        }
      }
      fetchSharedBoardsRange(
        deletedBoardPage,
        sharedBoardsPaginationInfo.current
      );
    }
    // eslint-disable-next-line
  }, [deleteBoardState]);

  const [deleteLinkState, deleteLink] = useFetch('DELETE', '/links/:id/');

  // NOTIFICATIONS
  const [fetchMyNotiState, fetchMyNotifications] = useFetch(
    'GET',
    '/users/:id/notification/',
    { useCache: true }
  );
  useEffect(() => {
    if (fetchMyNotiState.loading || !fetchMyNotiState.res) return;
    const current = fetchMyNotiState.fetchArgs.query?.page || 1;
    const { count, next, previous, results } = fetchMyNotiState.res.data;
    setMyNotiPaginationInfo({ current, count, previous, next });

    const currentTime = new Date().getTime();

    const notiIds = [];
    const processedNotifications = results.map((noti) => {
      notiIds.push(noti.id);
      return {
        ...noti,
        page: current,
        lastUpdate: currentTime,
      };
    });

    // store results
    setMyNotiIds((prev) => {
      // discard all pages later than the current one loading
      // in case of out of order page fetch, check length first
      const newMyNotiIds = prev.slice(
        0,
        current <= prev.length ? current : prev.length
      );

      // make sure that newMyNotiIds[current - 1] exists
      while (newMyNotiIds.length < current) {
        newMyNotiIds.push([]);
      }

      newMyNotiIds[current - 1] = notiIds;
      return newMyNotiIds;
    });

    updateNotifications(processedNotifications);
  }, [fetchMyNotiState]);

  // USER INFORMATION
  const [fetchUserState, fetchUserInfo] = useFetch('GET', '/users/:id/', {
    useCache: true,
  });
  useEffect(() => {
    if (fetchUserState.loading || !fetchUserState.res) return;
    const userInfo = fetchUserState.res.data;
    updateUsers(userInfo);
  }, [fetchUserState]);

  useEffect(() => {
    if (!userProfile) return;
    updateUsers(userProfile);
  }, [userProfile]);

  const value = {
    boards,
    links,
    notifications,
    users,
    myBoardIds,
    sharedBoardIds,
    myBoardsPaginationInfo,
    fetchMyBoardsState,
    fetchMyBoards,
    sharedBoardsPaginationInfo,
    fetchSharedBoardsState,
    fetchSharedBoards,
    exploreLinkIds,
    explorePaginationInfo,
    exploreFetchState,
    fetchExploreLinks,
    fetchBoardState,
    fetchBoard,
    fetchUserState,
    fetchUserInfo,
    fetchMyNotiState,
    fetchMyNotifications,
    windowSize,
    handleRouteModalClose,
    routeModalSize,
    setRouteModalSize,
    getDefaultBoardColor,
    updateBoard,
    hideLinkImage,
    setHideLinkImage,
    editBoardState,
    editBoard,
    deleteBoardState,
    deleteBoard,
    deleteLinkState,
    deleteLink,
    fetchMyBoardsRange,
    fetchSharedBoardsRange,
    isNotiModalOpen,
    setNotiModalOpen,
    handleNotiModalClose,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
