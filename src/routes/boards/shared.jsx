import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';
import BoardItem from '../../components/BoardItem';
import styled from 'styled-components';

export default function BoardsSharedRoute() {
  const {
    boards,
    sharedBoardIds,
    sharedBoardsPaginationInfo,
    fetchSharedBoardsState,
    fetchSharedBoards,
  } = useData();

  useEffect(() => {
    fetchSharedBoards({ query: { page: 1, shared: true }, useCache: true }); // boards/my에 get api 요청 보내고 res 받는 함수
    // eslint-disable-next-line
  }, []); // 중괄호 지랄 난거는 객체형태의 query를 객체형태의 인자로 싼거임!

  if (fetchSharedBoardsState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {sharedBoardIds.length &&
        sharedBoardIds[sharedBoardsPaginationInfo.current - 1].map(
          (boardId, idx) => {
            if (boards[boardId]) {
              return <BoardItem boardInfo={boards[boardId]} key={idx} />;
            } else {
              return <div key={idx}>Loading...</div>;
            }
          }
        )}
    </Container>
  );
}
// 배열에서부터 컴포넌트를 생성할 때 key 사용

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
