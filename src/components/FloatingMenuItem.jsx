import React from 'react';
import styled from 'styled-components';

export default function FloatingMenuItem({ label, imgSrc, ...props }) {
  return (
    <Container {...props}>
      {imgSrc && <img src={process.env.PUBLIC_URL + imgSrc} alt={label} />}
      {label}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 5px;
  display: flex;
  color: var(--color-g3);
  font-weight: 500;
  cursor: default;
  &:hover {
    background-color: var(--color-g9);
  }
  & img {
    margin-right: 16px;
    height: 1rem;
    position: relative;
    top: 1px;
  }
`;
