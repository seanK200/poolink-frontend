import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';
import { flatten } from 'lodash';
import SmallBoardItem from '../SmallBoardItem';
import styled from 'styled-components';

export default function SmallBoardList({ favorites = false }) {
  const {
    boards,
    myBoardIds,
    sharedBoardIds,
    fetchMyBoards,
    fetchSharedBoards,
  } = useData();
  const boardIds = flatten([...myBoardIds, ...sharedBoardIds]).filter(
    (boardId) => {
      return favorites === boards[boardId].is_bookmarked;
    }
  );

  useEffect(() => {
    fetchMyBoards({ query: { page: 1 }, useCache: true });
    fetchSharedBoards({ query: { page: 1, shared: true }, useCache: true });
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {boardIds.map((boardId, idx) => (
        <SmallBoardItem boardInfo={boards[boardId]} idx={idx} key={boardId} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
