import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './assets/Logo';
import Button from './buttons/Button';
import ShowMobile from './utilites/ShowMobile';
import SearchBar from './SearchBar';
import HamburgerButton from './buttons/HamburgerButton';
import PlusSvg from './assets/PlusSvg';

export default function Topbar({ showSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <StyledTopbar>
      <div>
        <ShowMobile style={{ paddingLeft: '24px' }} display="flex">
          <HamburgerButton
            style={{ marginRight: '12px' }}
            onClick={showSidebar}
          />
          <Logo
            style={{ width: '109px', display: isCollapsed ? 'block' : 'none' }}
          />
        </ShowMobile>
      </div>
      <div>
        <ShowMobile style={{ paddingRight: '24px' }} display="flex">
          <SearchBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <Button
            style={{ marginLeft: '8px' }}
            className="secondary small"
            icon={PlusSvg}
          >
            {isCollapsed ? '링크 추가' : ''}
          </Button>
        </ShowMobile>
      </div>
    </StyledTopbar>
  );
}

const StyledTopbar = styled.div`
  width: 100%;
  height: 88px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  & button {
    flex-shrink: 0;
  }
`;
