import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Logo({ ...rest }) {
  const navigate = useNavigate();

  function goToHomePage() {
    navigate('/');
  }

  return (
    <StyledLogo
      src={process.env.PUBLIC_URL + '/assets/BI.png'}
      alt="Poolink"
      onClick={goToHomePage}
      {...rest}
    />
  );
}

const StyledLogo = styled.img`
  width: 100%;
  position: relative;
  top: -3px;
  cursor: pointer;
`;
