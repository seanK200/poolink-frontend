import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { API_BASE_URL, useManualFetch } from '../hooks/useFetch';
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
  const [initialTokenValidated, setInitialTokenValidated] = useState(true);

  // profiles
  const [googleProfile, setGoogleProfile] = useState(initialGoogleProfile);
  const [userProfile, setUserProfile] = useLocalStorage(
    'userProfile',
    initialUserProfile
  );

  let location = useLocation();
  let navigate = useNavigate();

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

  const isLoggedIn = useCallback(() => {
    return isRefreshTokenValid && isUserProfileValid(userProfile);
  }, [isRefreshTokenValid, isUserProfileValid, userProfile]);

  const navigateToLogin = (modal = false) => {
    if (location.pathname !== '/login') {
      const navigateState = {
        from: location,
      };
      if (modal) {
        navigateState.backgroundLocation = location;
      }
      // settimeout to avoid navigate being called before mount
      setTimeout(() => {
        navigate('/login', { state: navigateState });
      }, 1);
    }
  };

  const handleTokenExpire = useCallback(
    (expiredAccessToken) => {
      if (
        (!expiredAccessToken || poolinkAccessToken === expiredAccessToken) &&
        isAccessTokenValid
      ) {
        // console.log(`handleTokenExpire`);
        setIsAccessTokenValid(false);
        // make request to refresh access token
      }
    },
    [poolinkAccessToken, isAccessTokenValid]
  );

  // refresh access token
  const [refreshAccessTokenState, requestAccessTokenRefresh] = useManualFetch(
    'POST',
    '/users/token/refresh',
    {
      useToken: false,
      attemptTokenRefresh: false,
      poolinkAccessToken,
      handleTokenExpire,
      isAccessTokenValid,
      isLoggedIn,
      navigateToLogin,
      initialTokenValidated,
    }
  );
  useEffect(() => {
    if (!refreshAccessTokenState.loading) {
      if (refreshAccessTokenState.res?.data) {
        // Access token refresh success
        // console.log(`Successfully refreshed access token`);
        setPoolinkAccessToken(
          refreshAccessTokenState.res?.data?.access_token || ''
        );
      } else if (refreshAccessTokenState.err) {
        // Failed to refresh access token. Signout.
        setIsRefreshTokenValid(false);
        poolinkSignout();
      }
    }
    // eslint-disable-next-line
  }, [refreshAccessTokenState]);

  useEffect(() => {
    if (
      !refreshAccessTokenState.loading &&
      isUserProfileValid(userProfile) &&
      !isAccessTokenValid &&
      poolinkAccessToken
    ) {
      // console.log(`Requesting access token refresh`);
      requestAccessTokenRefresh({
        data: { refresh_token: poolinkRefreshToken },
      });
    }
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

  const poolinkSignout = (modal = false) => {
    if (modal) {
      navigate('/signout', { state: { backgroundLocation: location } });
    } else {
      navigate('/signout');
    }
  };

  const handlePoolinkSignoutSuccess = () => {
    setPoolinkAccessToken('');
    setPoolinkRefreshToken('');
    setUserProfile(initialUserProfile);
    navigate('/welcome', { replace: true });
  };

  const handlePoolinkSignoutError = () => {
    setPoolinkAccessToken('');
    setPoolinkRefreshToken('');
    setUserProfile(initialUserProfile);
    navigate('/welcome', { replace: true });
  };

  // Initial Token Validation
  // Check if the stored refresh token is valid
  // initialTokenValidated will be set to true after initial check
  // and will remain true throughout the lifecycle of AuthProvider
  // prevent any useFetch hooks from running before token validation

  // const [] = useManualFetch(
  //   'POST',
  //   '/users/token/refresh',
  //   {
  //     useToken: false,
  //     attemptTokenRefresh: false,
  //     poolinkAccessToken,
  //     handleTokenExpire,
  //     isAccessTokenValid,
  //     isLoggedIn,
  //     navigateToLogin,
  //     initialTokenValidated
  //   }
  // )

  // useEffect(() => {
  //   if (!initialTokenValidated && poolinkRefreshToken) {

  //   }
  // }, [poolinkRefreshToken]);

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
    initialTokenValidated,
    setInitialTokenValidated,
    isLoggedIn,
    isUserProfileValid,
    isUserProfileComplete,
    handleTokenExpire,
    poolinkLogin,
    poolinkSignout,
    handlePoolinkSignoutSuccess,
    handlePoolinkSignoutError,
    navigateToLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
