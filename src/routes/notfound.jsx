import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/assets/Logo';

export default function NotFound() {
  let location = useLocation();
  let from = location?.state?.from;

  return (
    <Container>
      <Logo style={{ width: '240px', marginBottom: '16px' }} />
      <p>
        요청하신 페이지{from ? `('${from?.pathname}')` : ''}를 찾을 수 없습니다.
      </p>
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
`;
