import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';
import BoardItem from '../../components/BoardItem';
import styled from 'styled-components';

export default function BoardsMyRoute() {
  const {
    boards,
    myBoardIds,
    myBoardsCurrentPage,
    fetchMyBoardsState,
    fetchMyBoards,
  } = useData();

  useEffect(() => {
    fetchMyBoards({ query: { page: 1 } }); // boards/my에 get api 요청 보내고 res 받는 함수
    // eslint-disable-next-line
  }, []); // 중괄호 지랄 난거는 객체형태의 query를 객체형태의 인자로 싼거임!

  if (fetchMyBoardsState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BoardContainer>
        {myBoardIds.length > 0 &&
          myBoardIds[myBoardsCurrentPage - 1].map((boardId, idx) => {
            if (boards[boardId]) {
              return <BoardItem boardInfo={boards[boardId]} key={idx} />;
            } else {
              return <div key={idx}>Loading...</div>;
            }
          })}
      </BoardContainer>
      <SeeMoreButton className="secondary">더 보기</SeeMoreButton>
    </Container>
  );
}
// 배열에서부터 컴포넌트를 생성할 때 key 사용

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SeeMoreButton = styled.button`
  height: 40px;
  border: 1px solid var(--color-secondary);
`;
