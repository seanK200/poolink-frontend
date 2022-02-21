import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, matchPath, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import { useAuth } from '../contexts/AuthProvider';

export default function Nav({ iconSvg, to, text, ...rest }) {
  let location = useLocation();
  let params = useParams();
  const { userProfile } = useAuth();
  const { boards } = useData();

  const getClassName = ({ isActive }) => {
    try {
      if (isActive) return 'active';

      const pathname = location?.state?.backgroundLocation
        ? location.state.backgroundLocation.pathname
        : location.pathname;

      // check backgroundLocation (modals)
      if (matchPath({ path: to }, pathname)) return 'active';

      // check current board ID
      if (matchPath({ path: '/board/:boardId' }, pathname)) {
        const { boardId } = params;
        if (!boardId) return undefined;

        // my board
        const isMyBoard = boards[boardId]?.user === userProfile?.userId;
        const isMyBoardNav = to === '/boards/my';
        if (isMyBoard && isMyBoardNav) return 'active';

        // shared board
        const isSharedBoard = boards[boardId]?.invited_users?.includes(
          userProfile.userId
        );
        const isSharedBoardNav = to === '/boards/shared';
        if (isSharedBoard && isSharedBoardNav) return 'active';
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  };

  return (
    <StyledNav {...rest}>
      <NavLink to={to} className={getClassName}>
        <FlexRow>
          {iconSvg ? iconSvg : ''}
          <div>{text ? text : ''}</div>
        </FlexRow>
      </NavLink>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
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
