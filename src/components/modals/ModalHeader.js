import React from 'react';
import styled from 'styled-components';
import { XLg } from 'react-bootstrap-icons';

export default function ModalHeader({
  heading,
  headerType,
  onModalClose: handleModalClose,
}) {
  return (
    <Container className={headerType}>
      <Heading>{heading ? heading : ''}</Heading>
      <XLg
        style={{
          cursor: 'pointer',
          color: 'black',
          fontSize: '1.4rem',
        }}
        onClick={handleModalClose}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.floating {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const Heading = styled.h1`
  display: block;
  font-size: 1.4rem;
  line-height: 1em;
  padding: 0;
  margin: 0;
`;
