import React, { useState } from 'react';
import GotoButton from './buttons/GotoButton';
import styled from 'styled-components';

export default function CollapsibleSection({
  label,
  component,
  iconSvg,
  startCollapsed,
  children,
  ...rest
}) {
  const [isCollapsed, setIsCollapsed] = useState(
    startCollapsed ? startCollapsed : false
  );

  const handleHeaderClick = (e) => {
    e.stopPropagation();
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  return (
    <StyledCollapsibleSection {...rest}>
      <Header
        onClick={handleHeaderClick}
        className={isCollapsed ? 'collapsed' : ''}
      >
        <LabelContainer>
          {iconSvg ? iconSvg : ''}
          {label}
        </LabelContainer>
        <GotoButton />
      </Header>
      <Content className={`${isCollapsed ? 'collapsed' : ''}`}>
        {component ? component : children}
      </Content>
    </StyledCollapsibleSection>
  );
}

const StyledCollapsibleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 24px;
`;

const Header = styled.div`
  width: 100%;
  font-weight: 700;
  color: #747474;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;

  & svg.svg-board-list-icon {
    margin-right: 16px;
    fill: #888888;
  }

  & svg.svg-goto-button {
    transform: rotate(90deg) translateY(2px);
  }

  &.collapsed {
    margin-bottom: 0;
  }

  &.collapsed svg.svg-goto-button {
    transform: rotate(-90deg);
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  &.collapsed {
    display: none;
  }
`;
