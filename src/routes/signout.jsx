import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/assets/Logo';
import { useAuth } from '../contexts/AuthProvider';
import useFetch from '../hooks/useFetch';
import { SIGNOUT_MESSAGE } from '../consts/strings';
import Loader from '../components/assets/Loader';

export default function SignoutRoute() {
  const {
    poolinkRefreshToken,
    handlePoolinkSignoutSuccess,
    handlePoolinkSignoutError,
  } = useAuth();
  const [signoutState, signoutFetch] = useFetch('POST', '/users/logout', {
    attemptTokenRefresh: false,
  });
  const [signoutMessage, setSignoutMessage] = useState(SIGNOUT_MESSAGE.before);

  // request signout on component mount
  useEffect(() => {
    signoutFetch({ data: { refresh_token: poolinkRefreshToken } });
    // eslint-disable-next-line
  }, []);

  // handle signout status changes, results
  useEffect(() => {
    if (signoutState.loading) {
      setSignoutMessage(SIGNOUT_MESSAGE.loading);
    } else {
      if (signoutState.res) {
        setSignoutMessage(SIGNOUT_MESSAGE.success);
        handlePoolinkSignoutSuccess();
      }
    }
    if (signoutState.err) {
      setSignoutMessage(SIGNOUT_MESSAGE.error);
      handlePoolinkSignoutError();
      console.log(signoutState.err);
    }
    // eslint-disable-next-line
  }, [signoutState]);

  return (
    <Container>
      <Logo style={{ width: '240px', marginBottom: '16px' }} />
      <div>
        <p>{signoutMessage}</p>
        <Loader size="32px" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }
`;
