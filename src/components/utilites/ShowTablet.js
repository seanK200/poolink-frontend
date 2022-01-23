import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../consts/responsive';

export default function ShowTablet({ children, display, only, ...rest }) {
  return (
    <StyledShowTablet only={only} display={display} {...rest}>
      {children}
    </StyledShowTablet>
  );
}

const StyledShowTablet = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpoints.md}px) ${(props) =>
      props.only ? `and (min-width: ${breakpoints.sm}px)` : ''} {
    display: ${(props) => (props.display ? props.display : 'block')};
  }
`;
