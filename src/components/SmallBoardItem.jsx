import React from 'react';
import styled from 'styled-components';

export default function SmallBoardItem({ boardInfo, ...props }) {
  if (!boardInfo) return null;
  return (
    <Container {...props}>
      <Emoji emoji={boardInfo.emoji}>{boardInfo.emoji || ''}</Emoji>
      {boardInfo.name}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 14px 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 10px;
  &:hover {
    background-color: var(--color-g9);
  }
`;

const Emoji = styled.div`
  width: 16px;
  height: 16px;
  background-color: #b6d8ff;
  margin-right: 16px;
  border-radius: ${({ emoji }) => (emoji === null ? '8px' : '0')};
`;
