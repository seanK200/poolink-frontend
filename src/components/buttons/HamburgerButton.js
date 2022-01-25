import React from 'react';
import styled from 'styled-components';
import HamburgerSvg from '../assets/HamburgerSvg';

export default function HamburgerButton({ ...props }) {
  return <Container {...props}>{HamburgerSvg}</Container>;
}

const Container = styled.div`
  width: 19px;
`;
