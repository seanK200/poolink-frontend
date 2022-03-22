import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';
import BoardItem from '../../components/BoardItem';
import styled from 'styled-components';
import { breakpoints } from '../../consts/responsive';

export default function BoardsMyRoute() {
  const {
    boards,
    myBoardIds,
    myBoardsPaginationInfo,
    fetchMyBoardsState,
    fetchMyBoards,
  } = useData();

  useEffect(() => {
    fetchMyBoards({ query: { page: 1 }, useCache: true }); // boards/my에 get api 요청 보내고 res 받는 함수
    // eslint-disable-next-line
  }, []); // 중괄호 지랄 난거는 객체형태의 query를 객체형태의 인자로 싼거임!

  if (fetchMyBoardsState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BoardContainer>
        {myBoardIds.length > 0 &&
          myBoardIds[myBoardsPaginationInfo.current - 1].map((boardId) => {
            if (boards[boardId]) {
              return <BoardItem boardInfo={boards[boardId]} key={boardId} />;
            } else {
              return <div key={boardId}>Loading...</div>;
            }
          })}
      </BoardContainer>
      {myBoardsPaginationInfo.next && (
        <SeeMoreButton className="secondary">더 보기</SeeMoreButton>
      )}
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
  @media only screen and (max-width: ${breakpoints.sm}px) {
    justify-content: center;
    transition: 0.5s ease;
  }
`;

const SeeMoreButton = styled.button`
  height: 40px;
  border: 1px solid var(--color-secondary);
`;
