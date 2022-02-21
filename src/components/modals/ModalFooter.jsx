import React from 'react';
import styled from 'styled-components';

export default function ModalFooter({ footerRef, children, shadow, ...props }) {
  return (
    <Container
      className={`RouteModal__Content-footer${shadow ? ' shadow' : ''}`}
      ref={footerRef ? footerRef : undefined}
      {...props}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 16px 24px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0 0 10px 10px;
  background-color: white;
  &.shadow {
    box-shadow: 0px -8px 8px -8px rgba(0, 0, 0, 0.25);
  }
`;
