import React from 'react';
import styled from 'styled-components';

export default function Logo({ ...rest }) {
  return (
    <StyledLogo
      src={process.env.PUBLIC_URL + '/assets/BI.png'}
      alt="Poolink"
      {...rest}
    />
  );
}

const StyledLogo = styled.img`
  width: 100%;
`;
