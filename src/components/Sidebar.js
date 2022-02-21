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
import HideMobile from './utilites/HideMobile';
import ShowMobile from './utilites/ShowMobile';
import AccountProfile from './AccountProfile';
import NotificationsButton from './buttons/NotificationsButton';
import SmallBoardList from './sidebar/SmallBoardList';

export default function Sidebar({ isVisible, hideSidebar }) {
  return (
    <StyledSidebar className={isVisible ? 'visible' : ''} onClick={hideSidebar}>
      <HideMobile>
        <Logo
          className="logo-sidebar"
          style={{ width: '109px', margin: '0 0 32px 0' }}
        />
      </HideMobile>
      <ShowMobile>
        <div
          style={{
            width: '100%',
            display: 'flex',
            marginBottom: '32px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <XLg
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsButton style={{ marginRight: '16px' }} />
            <AccountProfile />
          </div>
        </div>
      </ShowMobile>
      <HideMobile>
        <AddLinkButton />
      </HideMobile>
      <Nav text="내 보드" to="/boards/my" iconSvg={BoardListSvg} />
      <Nav text="공유 보드" to="/boards/shared" iconSvg={SharedBoardsSvg} />
      <Nav text="탐색" to="/explore" iconSvg={ExploreSvg} />
      <Nav text="설정" to="/settings" iconSvg={SettingsSvg} />
      <DividerLine margin="0 0 24px 0" />
      <CollapsibleSection
        label="즐겨찾는 보드"
        component={<SmallBoardList favorites={true} />}
        className="no-scrollbar"
        iconSvg={<FavoritesIcon style={{ marginRight: '16px' }} />}
      />
      <CollapsibleSection
        label="보드 목록"
        component={<SmallBoardList />}
        className="no-scrollbar"
        iconSvg={BoardListSvg}
      />
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  width: 248px;
  height: 100vh;
  padding: 32px 24px 24px 24px;
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
  @media only screen and (max-width: 768px) {
    position: absolute;
    z-index: 4;
    transform: translateX(-100%);
    opacity: 0;
    transition: 0.5s ease;

    &.visible {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
