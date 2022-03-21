import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RouteModal from './components/modals/RouteModal';
import { useData } from './contexts/DataProvider';
import DefaultLayout from './routes';
import EditBoardRoute from './routes/board/$boardId/edit';
import BoardRoute from './routes/board/$boardId/index';
import AddBoardRoute from './routes/board/new';
import BoardsLayout from './routes/boards/index';
import BoardsMyRoute from './routes/boards/my';
import BoardsSharedRoute from './routes/boards/shared';
import ExploreRoute from './routes/explore';
import GoogleOauthRoute from './routes/googleoauth';
import LinkRoute from './routes/link/$linkId';
import AddLinkRoute from './routes/link/new';
import LoginRoute from './routes/login';
import NotFound from './routes/notfound';
import SettingsLayout from './routes/settings';
import SettingsGeneralRoute from './routes/settings/general';
import SignoutRoute from './routes/signout';
import SignupLayout from './routes/signup';
import SignupCategoryRoute from './routes/signup/category';
import SignupInfoRoute from './routes/signup/info';
import LandingPage from './routes/welcome';

function App() {
  const { routeModalSize } = useData();
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  let location = useLocation();
  let state = location?.state;

  useEffect(() => {
    if (state?.backgroundLocation) {
      setIsRouteModalOpen(true);
    } else {
      setIsRouteModalOpen(false);
    }
  }, [state]);

  return (
    <Wrapper>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="boards/my" replace={true} />} />
          <Route path="boards/*" element={<BoardsLayout />}>
            <Route index element={<Navigate to="my" replace={true} />} />
            <Route path="my" element={<BoardsMyRoute />} />
            <Route path="shared" element={<BoardsSharedRoute />} />
          </Route>
          <Route path="explore" element={<ExploreRoute />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="general" />} />
            <Route path="general" element={<SettingsGeneralRoute />} />
          </Route>
          <Route path="board/:boardId" element={<BoardRoute />} />
          <Route
            path="board/:boardId/edit"
            element={<Navigate to="/" replace={true} />}
          />
          <Route
            path="board/new"
            element={<Navigate to="/" replace={true} />}
          />
          <Route
            path="link/:linkId"
            element={<Navigate to="/" replace={true} />}
          />
          <Route path="link/new" element={<Navigate to="/" replace={true} />} />
        </Route>
        <Route path="login" element={<LoginRoute />} />
        <Route path="signup" element={<SignupLayout />}>
          <Route index element={<Navigate to="info" />} />
          <Route path="info" element={<SignupInfoRoute />} />
          <Route path="category" element={<SignupCategoryRoute />} />
        </Route>
        <Route path="signout" element={<SignoutRoute />} />
        <Route
          path="/googlea1d97ae014823e39.html"
          element={<GoogleOauthRoute />}
        />
        <Route path="welcome" element={<LandingPage />} />
        <Route path="notfound" element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to="notfound" state={{ from: location }} />}
        />
      </Routes>
      <RouteModal isOpen={isRouteModalOpen}>
        <Routes>
          <Route path="login" element={<LoginRoute isRouteModalOpen />} />
          <Route path="signout" element={<SignoutRoute isRouteModalOpen />} />
          <Route
            path="link/new"
            element={<AddLinkRoute isRouteModalOpen />}
          ></Route>
          <Route path="link/:linkId" element={<LinkRoute />} />
          <Route
            path="board/new"
            element={<AddBoardRoute isRouteModalOpen />}
          />
          <Route
            path="board/:boardId/edit"
            element={<EditBoardRoute isRouteModalOpen />}
          />
          <Route
            path="*"
            element={
              <div className={`RouteModal__Content ${routeModalSize}`} />
            }
          />
        </Routes>
      </RouteModal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default App;

/*  Copyright 2022 Youngwoo Kim, Yunsun Jung */
