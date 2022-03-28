import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthProvider';
import Button from './buttons/Button';
import { SIGNOUT_PROMPT } from '../consts/strings';

export default function AccountProfile() {
  const { userProfile, isUserProfileValid, poolinkSignout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const profileImgRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleProfileImgClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfileImgError = () => {
    profileImgRef.current.src =
      process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png';
  };

  const handleSignoutClick = () => {
    if (window.confirm(SIGNOUT_PROMPT)) {
      poolinkSignout(true);
    }
  };

  useEffect(() => {
    // Set the display to be visible,
    if (menuOpen) {
      menuRef?.current?.style && (menuRef.current.style.display = 'flex');
    }

    // PUT ALL ANIMATABLES INSIDE THIS SETTIMEOUT
    // then wait before changing the opacity so that it can be animated
    setTimeout(() => {
      // Change the opacity to make the menu visible
      menuRef?.current?.style &&
        (menuRef.current.style.opacity = menuOpen ? 1 : 0);

      // Correctly position the profile image
      if (menuOpen) {
        let menuWidth = menuRef.current
          ? window.getComputedStyle(menuRef.current).width
          : '0px';
        menuWidth = menuWidth === 'auto' ? '0px' : menuWidth; // if width is 'auto', set to '0px'
        menuWidth = parseFloat(menuWidth.slice(0, -2)); // remove the 'px' at the end and parse float for calculation

        // if menu is open, center the profile image
        profileImgRef?.current?.style &&
          profileImgRef.current.style.setProperty(
            '--horizontal-position',
            Math.floor(menuWidth / 2).toString() + 'px'
          );
      } else {
        // if menu is closed, profile image goes to very right
        profileImgRef?.current?.style &&
          profileImgRef.current.style.setProperty(
            '--horizontal-position',
            '0px'
          );
      }
    }, 1); // setTimeout

    // After menu close, display to none to prevent it getting clicked
    setTimeout(() => {
      if (!menuOpen) {
        menuRef?.current?.style && (menuRef.current.style.display = 'none');
      }
    }, 250);
  }, [menuOpen]);

  useEffect(() => {
    if (isUserProfileValid) {
      profileImgRef.current.src =
        userProfile?.profileImage ||
        process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png';
    }
    // eslint-disable-next-line
  }, [userProfile]);

  return (
    <React.Fragment>
      <Container>
        <img
          src={
            userProfile?.profileImage ||
            process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png'
          }
          alt="My Profile"
          className={menuOpen ? 'menuOpen' : ''}
          ref={profileImgRef}
          onClick={handleProfileImgClick}
          onError={handleProfileImgError}
        />
        <MenuContainer
          menuOpen={menuOpen}
          ref={menuRef}
          className={menuOpen ? 'menuOpen' : ''}
        >
          <ProfileInfo>
            <UserName>{userProfile?.userName || ''}</UserName>
            <UserEmail>{userProfile?.email || ''}</UserEmail>
          </ProfileInfo>
          <Button
            className="secondary tiny"
            style={{ width: '100%', marginBottom: '4px' }}
          >
            내 프로필 설정
          </Button>
          <Button
            className="tiny"
            style={{ width: '100%', color: 'var(--color-gray)' }}
            onClick={handleSignoutClick}
          >
            로그아웃
          </Button>
        </MenuContainer>
      </Container>
      <Overlay onClick={closeMenu} menuOpen={menuOpen}></Overlay>
    </React.Fragment>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
  & img {
    --horizontal-position: 0px;
    position: relative;
    top: 0;
    right: var(--horizontal-position);
    width: 32px;
    z-index: 3;
    transition: 0.25s ease-in-out;
    border-radius: 50%;
  }
  & img.menuOpen {
    width: 55px;
    top: 16px;
    right: var(--horizontal-position);
    transform: translateX(50%);
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 187px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
  z-index: 2;
  border-radius: 10px;
  display: flex;
  opacity: 0;
  flex-direction: column;
  align-items: center;
  padding: 79px 24px 24px 24px;
  transition: opacity 0.25s ease-in-out;
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const UserName = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 1px 0;
`;

const UserEmail = styled.a`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-gray);
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${(props) => (props.menuOpen ? 'block' : 'none')};
`;
