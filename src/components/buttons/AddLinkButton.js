import React from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

export default function AddLinkButton(props) {
  return (
    <StyledAddLinkButton {...props}>
      <ButtonIcon>
        <PlusCircleFill />
      </ButtonIcon>
      <ButtonText>링크 추가하기</ButtonText>
    </StyledAddLinkButton>
  );
}

const StyledAddLinkButton = styled.button`
  background-color: #eef4ff;
  color: #3d81f5;
  border: none;
  border-radius: 10px;

  width: 100%;
  padding: 16px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ButtonIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const ButtonText = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;
