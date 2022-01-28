import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/assets/Logo';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, useAuth } from '../../contexts/AuthProvider';
import { breakpoints } from '../../consts/responsive';

export default function LoginRoute({ isRouteModalOpen }) {
  const { setGoogleProfile } = useAuth();

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
      const googleProfile = googleResponse.profileObj;
      setGoogleProfile(googleProfile);
    }
  };

  const handleGoogleLoginError = async (googleResponse) => {
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
        <div id="login-message"></div>
        <div id="login-form-container">
          <Logo style={{ width: '208px', marginBottom: '48px' }} />
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Google로 로그인"
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
    min-height: 100vh;
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
