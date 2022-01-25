import React from 'react';
import styled from 'styled-components';
import BoardListSvg from '../components/assets/BoardListSvg';
import DividerLine from '../components/assets/DividerLine';
import ExploreSvg from '../components/assets/ExploreSvg';
import SettingsSvg from '../components/assets/SettingsSvg';
import SharedBoardsSvg from '../components/assets/SharedBoardsSvg';
import AddLinkButton from '../components/buttons/AddLinkButton';
import Logo from '../components/assets/Logo';
import Nav from '../components/Nav';
import CollapsibleSection from '../components/CollapsibleSection';
import FavoritesIcon from '../components/assets/FavoritesIcon';
import { XLg } from 'react-bootstrap-icons';

export default function Sidebar({ isVisible, hideSidebar }) {
  return (
    <StyledSidebar className={isVisible ? 'visible' : ''} onClick={hideSidebar}>
      <Logo
        className="logo-sidebar"
        style={{ width: '109px', margin: '32px 0' }}
      />
      <XLg
        style={{
          cursor: 'pointer',
          color: 'black',
          position: 'absolute',
          top: '36px',
          right: '24px',
        }}
        className="mobile-close-sidebar"
      />
      <AddLinkButton />
      <Nav text="내 보드" to="/boards/my" iconSvg={BoardListSvg} />
      <Nav text="공유 보드" to="/boards/shared" iconSvg={SharedBoardsSvg} />
      <Nav text="탐색" to="/explore" iconSvg={ExploreSvg} />
      <Nav text="설정" to="/settings" iconSvg={SettingsSvg} />
      <DividerLine margin="0 0 24px 0" />
      <CollapsibleSection
        label="즐겨찾는 보드"
        component={<div>Test2</div>}
        className="no-scrollbar"
        iconSvg={<FavoritesIcon style={{ marginRight: '16px' }} />}
      />
      <CollapsibleSection
        label="보드 목록"
        component={<div>Test1</div>}
        className="no-scrollbar"
        iconSvg={BoardListSvg}
      />
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  width: 248px;
  height: 100vh;
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  overflow-y: auto;
  flex-shrink: 0;
  & > * {
    flex-shrink: 0;
  }
  & .mobile-close-sidebar {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    position: absolute;
    z-index: 4;
    left: -248px;
    opacity: 0;
    transition: 0.5s ease;

    &.visible {
      opacity: 1;
      transform: translateX(248px);
    }
    & .mobile-close-sidebar {
      display: flex;
    }
  }
`;
