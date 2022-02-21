import React from 'react';
import Button from '../../components/buttons/Button';
import styled from 'styled-components';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';

export default function BoardsLayout() {
  const { myBoardsPaginationInfo } = useData();
  let location = useLocation();

  return (
    <div className="view-content">
      <BlueContainer>
        <ToolBar>
          <NumberOfBoards>
            <Routes location={location?.state?.backgroundLocation || location}>
              <Route
                path="my"
                element={`내 보드 ${myBoardsPaginationInfo.count}개`}
              />
              <Route path="shared" element={`공유 보드 0개`} />
            </Routes>
          </NumberOfBoards>
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
        </ToolBar>
        <Outlet />
      </BlueContainer>
    </div>
  );
}

const BlueContainer = styled.div`
  width: 100%;
`;

const ToolBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

const NumberOfBoards = styled.div`
  color: var(--color-g5);
`;

const ButtonContainer = styled.div`
  padding: 0 5px 0 0;
  display: flex;
`;
