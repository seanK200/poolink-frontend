import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RouteModal from './components/modals/RouteModal';
import DefaultLayout from './routes';
import BoardLayout from './routes/board';
import BoardRoute from './routes/board/$id';
import LinkRoute from './routes/board/link/$id';
import BoardsLayout from './routes/boards';
import BoardsMyRoute from './routes/boards/my';
import BoardsSharedRoute from './routes/boards/shared';
import ExploreRoute from './routes/explore';
import GoogleOauthRoute from './routes/googleoauth';
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
  let location = useLocation();
  let state = location?.state;
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

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
          <Route index element={<Navigate to="boards/my" />} />
          <Route path="boards" element={<BoardsLayout />}>
            <Route index element={<Navigate to="my" />} />
            <Route path="my" element={<BoardsMyRoute />} />
            <Route path="shared" element={<BoardsSharedRoute />} />
          </Route>
          <Route path="explore" element={<ExploreRoute />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="general" />} />
            <Route path="general" element={<SettingsGeneralRoute />} />
          </Route>
          <Route path="board" element={<BoardLayout />}>
            <Route index element={<Navigate to="/" />} />
            <Route path=":id" element={<BoardRoute />}>
              <Route path="link/:id" element={<LinkRoute />} />
            </Route>
          </Route>
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
      <RouteModal isOpen={isRouteModalOpen} headerType="floating">
        <Routes>
          <Route path="login" element={<LoginRoute isRouteModalOpen />} />
          <Route path="signout" element={<SignoutRoute />} />
          <Route path="*" element={<React.Fragment />} />
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
