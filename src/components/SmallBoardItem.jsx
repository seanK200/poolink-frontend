import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../contexts/DataProvider';

export default function SmallBoardItem({ boardInfo, idx, ...props }) {
  const { getDefaultBoardColor } = useData();
  let navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/board/${boardInfo.board_id}`);
  };

  if (!boardInfo) return null;
  return (
    <Container onClick={handleClick} {...props}>
      {boardInfo.emoji ? (
        <Emoji>{boardInfo.emoji}</Emoji>
      ) : (
        <NoEmoji bgColor={getDefaultBoardColor(idx)} />
      )}
      {boardInfo.name}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 8px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-g2);
  border-radius: 10px;
  &:hover {
    background-color: var(--color-g9);
  }
  cursor: pointer;
`;

const Emoji = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 16px;
`;

const NoEmoji = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor || 'var(--color-g9)'};
`;
