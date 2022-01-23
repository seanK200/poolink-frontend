import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../consts/responsive';

export default function ShowMobile({ children, display, ...rest }) {
  return (
    <StyledShowMobile display={display} {...rest}>
      {children}
    </StyledShowMobile>
  );
}

const StyledShowMobile = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpoints.sm}px) {
    display: ${(props) => (props.display ? props.display : 'block')};
  }
`;
