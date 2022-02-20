import React from 'react';
import SearchSvg from './SearchSvg';
import Loader from './Loader';
import styled from 'styled-components';

export default function SearchIcon({ loading, style, stroke }) {
  if (loading) return <Loader />;
  return (
    <Container
      style={{
        ...style,
      }}
      stroke={stroke}
    >
      {SearchSvg}
    </Container>
  );
}

const Container = styled.div`
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  position: relative;
  top: 1px;
  & svg {
    stroke: ${({ stroke }) => stroke || '#3D81F5'};
  }
`;
