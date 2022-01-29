import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { API_BASE_URL } from '../hooks/useFetch';
import axios from 'axios';

const AuthContext = React.createContext();

const initialGoogleProfile = {
  email: '',
  familyName: '',
  givenName: '',
  googleId: '',
  imageUrl: '',
  name: '',
};

const initialUserProfile = {
  userRealName: '',
  userName: '',
  email: '',
  prefer: [],
  userId: -1,
  profileImage: '',
  lastUpdate: '',
};

export const GOOGLE_CLIENT_ID =
  '173501864368-bu7fcnbc56ccsbl9sin5evkte1gvh4kf.apps.googleusercontent.com';

export function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  let location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  // tokens
  const [poolinkAccessToken, setPoolinkAccessToken] = useLocalStorage(
    'accessToken',
    ''
  );
  const [poolinkRefreshToken, setPoolinkRefreshToken] = useLocalStorage(
    'refreshToken',
    ''
  );

  // token valid flags
  const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);
  const [isRefreshTokenValid, setIsRefreshTokenValid] = useState(false);

  // profiles
  const [googleProfile, setGoogleProfile] = useState(initialGoogleProfile);
  const [userProfile, setUserProfile] = useLocalStorage(
    'userProfile',
    initialUserProfile
  );

  let location = useLocation();
  let navigate = useNavigate();

  const handleTokenExpire = useCallback(
    (expiredAccessToken) => {
      if (poolinkAccessToken === expiredAccessToken && isAccessTokenValid) {
        console.log(`handleTokenExpire`);
        setIsAccessTokenValid(false);
        // make request to refresh access token
      }
    },
    [poolinkAccessToken, isAccessTokenValid]
  );

  // refresh access token
  useEffect(() => {
    async function refreshAccessToken() {
      let newPoolinkAccessToken = '';
      try {
        const url = API_BASE_URL + `/users/token/refresh`;
        const data = {
          refresh_token: poolinkRefreshToken,
        };
        const res = await axios.post(url, data);
        newPoolinkAccessToken = res.data.access_token;
      } catch (e) {
        newPoolinkAccessToken = '';
      }
      setPoolinkAccessToken(newPoolinkAccessToken);
      if (!newPoolinkAccessToken) {
        setIsRefreshTokenValid(false);
        poolinkSignout(); // on fail
      }
    }
    if (!isAccessTokenValid && poolinkAccessToken) refreshAccessToken();
    // eslint-disable-next-line
  }, [isAccessTokenValid]);

  // login to Poolink after Google response
  const poolinkLogin = useCallback(
    async (googleProfile, googleAccessToken) => {
      setGoogleProfile(googleProfile);
      try {
        // Login request to Poolink
        const url = API_BASE_URL + '/users/googlelogin';
        const data = {
          access_token: googleAccessToken,
        };
        const config = {};
        const user = await axios.post(url, data, config);

        // Profile image url from Google
        const { imageUrl: profileImage = '' } = googleProfile;

        // user information from Poolink
        const {
          name: userRealName = '',
          username: userName = '',
          email = '',
          prefer = [],
          user_id: userId = -1,
          access_token: accessToken = '',
          refresh_token: refreshToken = '',
        } = user.data;

        // construct new user profile
        const userProfile = {
          userId,
          userRealName,
          userName,
          email,
          prefer,
          profileImage,
          lastUpdate: new Date().toJSON(),
        };

        // set the states
        setUserProfile(userProfile);
        setPoolinkAccessToken(accessToken);
        setPoolinkRefreshToken(refreshToken);
      } catch (e) {
        // on fail, log the error
        console.log(e);
      }
    },
    [setUserProfile, setPoolinkAccessToken, setPoolinkRefreshToken]
  );

  const navigateToLogin = () => {
    if (location.pathname !== '/login') {
      navigate('/login', { state: { from: location } });
    }
  };

  const poolinkSignout = async () => {};

  const handlePoolinkSignoutSuccess = () => {
    setPoolinkAccessToken('');
    setPoolinkRefreshToken('');
    setUserProfile(initialUserProfile);
  };

  const isLoggedIn = useCallback(() => {
    return isRefreshTokenValid;
  }, [isRefreshTokenValid]);

  const isUserProfileValid = useCallback((userProfile) => {
    return userProfile && userProfile.userId >= 0;
  }, []);

  // all required information is filled
  const isUserProfileComplete = useCallback(
    (userProfile, strict = false) => {
      if (userProfile && isUserProfileValid(userProfile)) {
        const { userRealName, userName, email, prefer } = userProfile;
        // Always check userRealName, userName, email
        let isComplete = userRealName && userName && email;
        // Only check prefer on strict mode
        if (strict) isComplete = isComplete && prefer?.length;

        return isComplete;
      }
      return false;
    },
    [isUserProfileValid]
  );

  useEffect(() => {
    if (poolinkAccessToken) {
      setIsAccessTokenValid(true);
    } else {
      setIsAccessTokenValid(false);
    }
  }, [poolinkAccessToken]);

  useEffect(() => {
    if (poolinkRefreshToken) {
      setIsRefreshTokenValid(true);
    } else {
      setIsRefreshTokenValid(false);
    }
  }, [poolinkRefreshToken]);

  const value = {
    googleProfile,
    setGoogleProfile,
    userProfile,
    poolinkAccessToken,
    poolinkRefreshToken,
    isAccessTokenValid,
    isRefreshTokenValid,
    isLoggedIn,
    isUserProfileValid,
    isUserProfileComplete,
    handleTokenExpire,
    poolinkLogin,
    poolinkSignout,
    handlePoolinkSignoutSuccess,
    navigateToLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
