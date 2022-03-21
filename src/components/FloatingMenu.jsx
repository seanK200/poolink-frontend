import React from 'react';
import styled from 'styled-components';

export default function FloatingMenu({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 8px;
`;
