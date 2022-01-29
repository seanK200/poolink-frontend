import React, { useContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';
import useFetch from '../hooks/useFetch';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider({ children }) {
  // data from servers
  const [myBoards, setMyBoards] = useState({});
  const [links, setLinks] = useState({});
  // const [categories, setCategories] = useState([]);

  // pagination - GET /boards/my
  const [myBoardsCurrentPage, setMyBoardsCurrentPage] = useState(0);
  const [myBoardsTotalPageCount, setMyBoardsTotalPageCount] = useState(1);
  const [myBoardsDataCount, setMyBoardsDataCount] = useState(0);

  // fetching boards
  const [fetchMyBoardsState, fetchMyBoards] = useFetch('GET', '/boards/my');

  // local values
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // window size change handler
  const handleWindowResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  // add boards to my boards
  useEffect(() => {
    if (fetchMyBoardsState?.res?.data) {
      // const { dataCount, totalPageCount, results } =
      //   fetchMyBoardsState.res.data;
      // const processedBoards = {};
      // const processedLinks = {};
      // results.forEach((board) => {});
    }
  }, [fetchMyBoardsState]);

  // Effects
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line
  }, []);

  const value = {
    myBoards,
    setMyBoards,
    links,
    setLinks,
    myBoardsCurrentPage,
    setMyBoardsCurrentPage,
    myBoardsTotalPageCount,
    setMyBoardsTotalPageCount,
    myBoardsDataCount,
    setMyBoardsDataCount,
    windowSize,
    fetchMyBoards,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
