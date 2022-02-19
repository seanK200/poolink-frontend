import React from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddLinkButton(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (typeof props?.onClick === 'function') props.onClick(e);
    navigate('/link/new', { state: { backgroundLocation: location } });
  };

  return (
    <StyledAddLinkButton onClick={handleClick} {...props}>
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
