import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from './buttons/Button';

export default function AccountProfile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const profileImgRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleProfileImgClick = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    menuRef.current.style.opacity = menuOpen ? 1 : 0;
  }, [menuOpen]);

  return (
    <React.Fragment>
      <Container>
        <img
          src={process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png'}
          alt="Profile"
          className={menuOpen ? 'menuOpen' : ''}
          ref={profileImgRef}
          onClick={handleProfileImgClick}
        />
        <MenuContainer
          menuOpen={menuOpen}
          ref={menuRef}
          className={menuOpen ? 'menuOpen' : ''}
        >
          <ProfileInfo>
            <UserName>poolink</UserName>
            <UserEmail>yw.sean.kim@gmail.com</UserEmail>
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
  margin-right: 32px;
  & img {
    position: relative;
    top: 0;
    right: 0;
    width: 32px;
    z-index: 3;
    transition: 0.75s;
  }
  & img.menuOpen {
    width: 55px;
    top: 16px;
    right: 93px;
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
  transition: opacity 0.75s;
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
