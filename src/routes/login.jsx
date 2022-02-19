import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../components/assets/Logo';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, useAuth } from '../contexts/AuthProvider';
import { breakpoints } from '../consts/responsive';
import { LOGIN_MESSAGE } from '../consts/strings';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalHeader from '../components/modals/ModalHeader';
import { useData } from '../contexts/DataProvider';

export default function LoginRoute({ isRouteModalOpen }) {
  const { poolinkLogin, isLoggedIn } = useAuth();
  const { setRouteModalSize } = useData();
  const [loginMessage, setLoginMessage] = useState('');
  const loginMessageRef = useRef(null);

  let location = useLocation();
  let state = location?.state;
  let navigate = useNavigate();

  const handleGoogleLogin = async (googleResponse) => {
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

      // Navigate back to wherever the user came from (or home)
      let from = state?.from || '/';
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLoginError = async (googleError) => {
    loginMessageRef.current.style.color = 'red';
    switch (googleError?.error) {
      case 'idpiframe_initialization_failed':
        setLoginMessage(LOGIN_MESSAGE.error.idpiframe_initialization_failed);
        break;
      case 'popup_closed_by_user':
        setLoginMessage(LOGIN_MESSAGE.error.popup_closed_by_user);
        break;
      case 'access_denied':
        setLoginMessage(LOGIN_MESSAGE.error.access_denied);
        break;
      // case 'immediate_failed':
      //   break;
      default:
        break;
    }
    // console.log(googleError);
  };

  useEffect(() => {
    setRouteModalSize('fullscreen');
    if (isLoggedIn()) {
      // Navigate back to wherever the user came from (or home)
      let from = state?.from || '/';
      navigate(from, { replace: true });
      console.log(`Already logged in. Returning to ${state.from?.pathname}`);
    }
    return () => {
      setLoginMessage('');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {isRouteModalOpen && <ModalHeader headerType="floating" />}
      <LoginContainer
        className={
          isRouteModalOpen
            ? 'RouteModal__Content-container fullscreen'
            : 'container-no-modal'
        }
      >
        <LoginFormContainer>
          <div></div>
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
            <div
              id="login-message"
              ref={loginMessageRef}
              style={{ marginTop: loginMessage ? '24px' : '0' }}
            >
              {loginMessage}
            </div>
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
    </React.Fragment>
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
  & #login-message {
    line-height: 1.4rem;
    text-align: center;
  }
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
