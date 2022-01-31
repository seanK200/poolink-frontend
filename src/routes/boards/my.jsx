import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataProvider';
import BoardItem from '../../components/BoardItem';

export default function BoardsMyRoute() {
  const {
    boards,
    myBoardIds,
    myBoardsCurrentPage,
    myBoardsTotalPageCount,
    fetchMyBoardsState,
    fetchMyBoards,
  } = useData();

  useEffect(() => {
    fetchMyBoards({ query: { page: 1 } }); // boards/my에 get api 요청 보내고 res 받는 함수
  }, []); // 중괄호 지랄 난거는 객체형태의 query를 객체형태의 인자로 싼거임!

  if (fetchMyBoardsState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {myBoardIds.length > 0 &&
        myBoardIds[0].map((boardId, idx) => {
          if (boards[boardId]) {
            return <BoardItem boardInfo={boards[boardId]} key={idx} />; // 컴포넌트가 한 화면에 두개 이상 나올때 key 사용
          } else {
            return <div key={idx}>Loading...</div>;
          }
        })}
    </div>
  );
}
