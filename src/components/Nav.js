import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Nav({ iconSvg, to, text, ...rest }) {
  return (
    <StyledNav {...rest}>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        <FlexRow>
          {iconSvg ? iconSvg : ''}
          <div>{text ? text : ''}</div>
        </FlexRow>
      </NavLink>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  color: #c4c4c4;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;

  & svg {
    fill: #c4c4c4;
    margin-right: 16px;
  }

  &:hover,
  & .active {
    color: var(--color-primary);
    & svg {
      fill: var(--color-primary);
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
