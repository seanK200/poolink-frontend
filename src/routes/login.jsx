import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Logo from '../components/assets/Logo';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, useAuth } from '../contexts/AuthProvider';
import { breakpoints } from '../consts/responsive';
import { LOGIN_MESSAGE } from '../consts/strings';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginRoute({ isRouteModalOpen }) {
  const { poolinkLogin } = useAuth();
  const [loginMessage, setLoginMessage] = useState('');
  const loginMessageRef = useRef(null);

  let location = useLocation();
  let navigate = useNavigate();
  let state = location?.state;

  const handleGoogleLogin = async (googleResponse) => {
    console.log(googleResponse);
    if (googleResponse.profileObj) {
      /*
      Google OAuth profileObj = {
        email: "string",
        familyName: "string",
        givenName: "string",
        googleId: "string",
        imageUrl: "string",
        name: "string"
      }
      */
      // Response from Google
      const googleProfile = googleResponse.profileObj;
      const googleAccessToken = googleResponse.accessToken;
      setLoginMessage(LOGIN_MESSAGE.loading);
      loginMessageRef.current.style.color = 'black';

      // Login to Poolink server
      await poolinkLogin(googleProfile, googleAccessToken);
      setLoginMessage(LOGIN_MESSAGE.success);

      // Navigate to wherever user came from
      let from = state?.from || '/';
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLoginError = async (googleResponse) => {
    setLoginMessage(LOGIN_MESSAGE.error);
    loginMessageRef.current.style.color = 'red';
    console.log(googleResponse);
  };

  return (
    <LoginContainer
      className={
        isRouteModalOpen
          ? 'RouteModal__Content-container'
          : 'container-no-modal'
      }
    >
      <LoginFormContainer>
        <div id="login-message" ref={loginMessageRef}>
          {loginMessage}
        </div>
        <div id="login-form-container">
          <Logo style={{ width: '208px', marginBottom: '48px' }} />
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Google로 로그인"
            disabledStyle={{ visibility: 'hidden' }}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginError}
            prompt={'select_account'}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div id="catch-phrase">
          더 나은 링크를 위한 Poolink, 지금 바로 경험해보세요
        </div>
      </LoginFormContainer>
      <ImageContainer>
        <img
          src={process.env.PUBLIC_URL + '/images/LoginSplash.png'}
          alt="Poolink Login"
        />
      </ImageContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  &.container-no-modal {
    height: 100vh;
  }
  @media only screen and (max-width: ${breakpoints.sm}px) {
    width: 100%;
    flex-direction: column;
  }
`;

const LoginFormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  & #login-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & #catch-phrase {
    font-weight: 600;
    color: #8e8e8e;
  }
  @media only screen and (max-width: ${breakpoints.sm}px) {
    width: 100%;
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8e6fd;
  & img {
    width: 100%;
  }
  @media only screen and (max-width: ${breakpoints.sm}px) {
    display: none;
  }
`;
