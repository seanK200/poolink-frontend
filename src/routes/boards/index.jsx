import React from 'react';
import Button from '../../components/buttons/Button';
import styled from 'styled-components';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';

export default function BoardsLayout() {
  const { myBoardsDataCount } = useData();
  return (
    <div className="view-content">
      <BlueContainer>
        <ListToolBar>
          <ListSearchResult>
            <Routes>
              <Route path="my" element={`내 보드 ${myBoardsDataCount}개`} />
              <Route path="shared" element={`공유 보드 0개`} />
            </Routes>
          </ListSearchResult>
          <ButtonContainer>
            <Button
              className="minimal"
              icon={
                <img
                  src={process.env.PUBLIC_URL + '/assets/AddIcon.png'}
                  alt="Add"
                />
              }
              style={{ margin: '0 16px 0 0' }}
            >
              보드 추가하기
            </Button>
            <Button
              className="minimal"
              icon={
                <img
                  src={process.env.PUBLIC_URL + '/assets/SelectIcon.png'}
                  alt="Select"
                />
              }
            >
              선택하기
            </Button>
          </ButtonContainer>
        </ListToolBar>
        <Outlet />
      </BlueContainer>
    </div>
  );
}

const BlueContainer = styled.div`
  width: 100%;
`;

const ListToolBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px 16px 16px 16px;
`;

const ListSearchResult = styled.div`
  color: var(--color-g5);
`;

const ButtonContainer = styled.div`
  padding: 0 5px 0 0;
  display: flex;
`;
