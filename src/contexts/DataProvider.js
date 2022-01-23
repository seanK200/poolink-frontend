import React, { useContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useAuth } from './AuthProvider';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider({ children }) {
  // data from servers
  const [boards, setBoards] = useState({});
  const [links, setLinks] = useState({});
  const [categories, setCategories] = useState([]);

  // pagination - GET /boards/my
  const [boardsCurrentPage, setBoardsCurrentPage] = useState(0);
  const [boardsTotalPageCount, setBoardsTotalPageCount] = useState(1);
  const [boardsDataCount, setBoardsDataCount] = useState(0);

  // fetching boards
  const [fetchBoardsState, fetchBoards] = useFetch('GET', '/boards/my');

  const fetchBoardsNextPage = (pageNum) => {
    pageNum = pageNum ? pageNum : boardsCurrentPage + 1;
    if (pageNum <= boardsTotalPageCount) {
      fetchBoards({ query: { page: pageNum } });
      setBoardsCurrentPage((prev) => prev + 1);
    }
  };

  // just one link
  const processLinkResponse = (linkResponse) => {
    setLinks((prevLinks) => {
      return {
        ...prevLinks,
        [linkResponse.link_id]: linkResponse,
      };
    });
  };

  // array of links
  const processLinksResponse = (linksResponse) => {
    const linkIds = [];
    const processedLinks = {};
    linksResponse.forEach((link) => {
      linkIds.push(link.link_id);
      processedLinks[link.link_id] = link;
    });
    setLinks((prevLinks) => ({ ...prevLinks, ...processedLinks }));
    return linkIds;
  };

  // array of boards
  const processBoardsResponse = (boardsResponse) => {
    const processedBoards = {};
    boardsResponse.forEach((board) => {
      const processedBoard = {
        ...board,
        links: processLinksResponse(board.links),
      };
      processedBoards[board.board_id] = processedBoard;
    });
    setBoards((prevBoards) => ({ ...prevBoards, ...processedBoards }));
  };

  useEffect(() => {
    if (fetchBoardsState?.res?.data) {
      const { totalPageCount, dataCount, results } = fetchBoardsState.res.data;
      setBoardsTotalPageCount(totalPageCount);
      setBoardsDataCount(dataCount);
      processBoardsResponse(results);
    }
    // eslint-disable-next-line
  }, [fetchBoardsState]);

  const value = {
    boards,
    links,
    categories,
    boardsCurrentPage,
    boardsTotalPageCount,
    boardsDataCount,
    fetchBoardsNextPage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
