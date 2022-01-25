import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../components/assets/Logo';
import Button from '../../components/buttons/Button';
import Page1 from '../../components/landingpage/Page1';
import Page2 from '../../components/landingpage/Page2';
import Page3 from '../../components/landingpage/Page3';
import Page4 from '../../components/landingpage/Page4';
import Page5 from '../../components/landingpage/Page5';
import Page6 from '../../components/landingpage/Page6';

export default function LandingPage() {
  return (
    <Container>
      <LandingPageTopbar />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LandingPageTopbar() {
  let location = useLocation();
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('../login', { state: { backgroundLocation: location } });
  };

  return (
    <StyledLandingPageTopbar>
      <Logo style={{ width: '112px' }} />
      <div>
        <Button className="primary small" onClick={handleSignupClick}>
          시작하기
        </Button>
      </div>
    </StyledLandingPageTopbar>
  );
}

const StyledLandingPageTopbar = styled.div`
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 32px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & img {
    position: relative;
  }
`;
