import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './assets/Logo';
import Button from './buttons/Button';
import ShowMobile from './utilites/ShowMobile';
import SearchBar from './SearchBar';
import HamburgerButton from './buttons/HamburgerButton';
import PlusSvg from './assets/PlusSvg';
import { useData } from '../contexts/DataProvider';
import { breakpoints } from '../consts/responsive';
import HideMobile from './utilites/HideMobile';
import AccountProfile from './AccountProfile';
import NotificationsButton from './buttons/NotificationsButton';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Topbar({ showSidebar }) {
  const { windowSize } = useData();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <StyledTopbar>
      <div>
        <ShowMobile>
          <HamburgerButton
            style={{ marginLeft: '24px', marginRight: '12px' }}
            onClick={showSidebar}
          />
          <Logo
            style={{ width: '109px', display: isCollapsed ? 'block' : 'none' }}
          />
        </ShowMobile>
      </div>
      <div
        style={{
          flexGrow: 1,
          justifyContent: windowSize.width <= breakpoints.sm ? 'right' : 'left',
        }}
      >
        <SearchBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <div>
        <ShowMobile>
          <Button
            style={{ marginLeft: '8px' }}
            className="secondary small"
            icon={PlusSvg}
            onClick={() =>
              navigate('/link/new', { state: { backgroundLocation: location } })
            }
          >
            {isCollapsed ? '링크 추가' : ''}
          </Button>
        </ShowMobile>
        <HideMobile>
          <NotificationsButton style={{ marginRight: '24px' }} />
          <AccountProfile />
        </HideMobile>
      </div>
    </StyledTopbar>
  );
}

const StyledTopbar = styled.div`
  width: 100%;
  height: 88px;
  justify-content: space-between;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding-right: 32px;
  & > div {
    display: flex;
    align-items: center;
  }
  & button {
    flex-shrink: 0;
  }
  @media only screen and (max-width: ${breakpoints.sm}px) {
    padding-right: 24px;
  }
`;
