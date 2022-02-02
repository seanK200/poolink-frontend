import React from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import styled from 'styled-components';

export default function AddBoardButton() {
  return (
    <Container>
      <PlusLg id="add-board-plus-icon" />
      <ButtonText>새 보드</ButtonText>
    </Container>
  );
}

const Container = styled.div`
  width: 345px;
  height: 190px;
  margin: 16px;
  padding: 28px 24px;
  background-color: none;
  filter: drop-shadow(0 0 8px rgba(219, 224, 231, 0.7));
  border: 1.5px solid var(--color-primary);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
  & #add-board-plus-icon {
    font-size: 2.5rem;
  }
`;

const ButtonText = styled.div`
  font-size: 1.2rem;
  margin-top: 8px;
`;
