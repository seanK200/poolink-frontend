import { Route, Routes } from 'react-router-dom';
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
import SettingsLayout from './routes/settings';
import SettingsGeneralRoute from './routes/settings/general';
import SignupLayout from './routes/signup';
import SignupCategoryRoute from './routes/signup/category';
import SignupInfoRoute from './routes/signup/info';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="boards" element={<BoardsLayout />}>
          <Route path="my" element={<BoardsMyRoute />} />
          <Route path="shared" element={<BoardsSharedRoute />} />
        </Route>
        <Route path="explore" element={<ExploreRoute />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route path="general" element={<SettingsGeneralRoute />} />
        </Route>
        <Route path="board" element={<BoardLayout />}>
          <Route path=":id" element={<BoardRoute />}>
            <Route path="link/:id" element={<LinkRoute />} />
          </Route>
        </Route>
      </Route>
      <Route path="login" element={<LoginRoute />} />
      <Route path="signup" element={<SignupLayout />}>
        <Route path="info" element={<SignupInfoRoute />} />
        <Route path="category" element={<SignupCategoryRoute />} />
      </Route>
      <Route
        path="/googlea1d97ae014823e39.html"
        element={<GoogleOauthRoute />}
      />
    </Routes>
  );
}

export default App;
