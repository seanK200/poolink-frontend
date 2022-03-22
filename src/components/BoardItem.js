import React, { useState } from 'react';
import { useData } from '../contexts/DataProvider';
import { useAuth } from '../contexts/AuthProvider';
import Button from './buttons/Button';
import styled from 'styled-components';
import ScrapButton from './buttons/ScrapButton';
import MenuButton from './buttons/MenuButton';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingMenu from './FloatingMenu';
import FloatingMenuItem from './FloatingMenuItem';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BOARD_DELETE_WARNING } from '../consts/strings';

export default function BoardItem({ boardInfo }) {
  const { userProfile } = useAuth();
  const { links, deleteBoard } = useData();
  const navigate = useNavigate();
  let location = useLocation();

  const [isMenuVisible, setMenuVisible] = useState(false);

  // board edit
  const handleBoardEdit = () => {
    navigate(`/board/${boardInfo.board_id}/edit`, {
      state: { backgroundLocation: location },
    });
  };

  // copy link
  const getBoardLink = (boardId) => {
    return (
      window.location.protocol +
      '//' +
      window.location.host +
      '/board/' +
      boardId
    );
  };

  // delete board
  const handleDeleteBoard = () => {
    if (!window.confirm(BOARD_DELETE_WARNING)) return;
    deleteBoard({ params: { id: boardInfo.board_id } });
  };

  const boardFloatingMenu = (
    <FloatingMenu
      onClick={() => {
        setMenuVisible(false);
      }}
      style={{
        right: '0px',
      }}
    >
      <FloatingMenuItem
        label="수정"
        imgSrc="/assets/EditIcon.png"
        onClick={handleBoardEdit}
      />
      <CopyToClipboard text={getBoardLink(boardInfo.board_id)}>
        <FloatingMenuItem label="링크 복사" imgSrc="/assets/CopyButton.png" />
      </CopyToClipboard>
      <FloatingMenuItem
        label="보드 삭제"
        imgSrc="/assets/DeleteIcon.png"
        onClick={handleDeleteBoard}
      />
    </FloatingMenu>
  );

  return (
    <React.Fragment>
      <BoardItemContainer
        onClick={() => navigate(`/board/${boardInfo.board_id}`)}
        isMenuVisible={isMenuVisible}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <BoardName className="no-scrollbar">{boardInfo.name}</BoardName>
          <ButtonContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {boardInfo.user !== userProfile.userId && <ScrapButton />}
            <MenuButton
              onClick={() => {
                setMenuVisible((prev) => !prev);
              }}
            />
            {isMenuVisible && boardFloatingMenu}
            <FloatingMenuOverlay
              onClick={() => {
                setMenuVisible(false);
              }}
              visible={isMenuVisible}
            />
          </ButtonContainer>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <LinkContainer key={0}>
              <Favicon
                faviconSrc={
                  boardInfo.links.length >= 1
                    ? links[boardInfo.links[0]].favicon
                    : ''
                }
              />
              <LinkLabel>
                {boardInfo.links.length >= 1
                  ? links[boardInfo.links[0]].label
                  : ''}
              </LinkLabel>
            </LinkContainer>
            <LinkContainer key={1}>
              <Favicon
                faviconSrc={
                  boardInfo.links.length >= 2
                    ? links[boardInfo.links[1]].favicon
                    : ''
                }
              />
              <LinkLabel>
                {boardInfo.links.length >= 2
                  ? links[boardInfo.links[1]].label
                  : ''}
              </LinkLabel>
            </LinkContainer>
          </div>
          <Button
            icon={
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/FavoritesIcon${
                    boardInfo.is_bookmarked ? '' : 'Disabled'
                  }.png`
                }
                alt="Favorites"
              />
            }
            style={{
              width: '25px',
              fontSize: '1.3rem',
            }}
          />
        </div>
      </BoardItemContainer>
      <FloatingMenuOverlay
        onClick={() => {
          setMenuVisible(false);
        }}
        visible={isMenuVisible}
      />
    </React.Fragment>
  );
}

const BoardItemContainer = styled.div`
  width: 345px;
  height: 190px;
  margin: 16px;
  padding: 28px 24px;
  background-color: white;
  filter: drop-shadow(0 0 8px rgba(219, 224, 231, 0.7));
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  z-index: ${({ isMenuVisible }) => (isMenuVisible ? '2' : '0')};
`;

const BoardName = styled.div`
  font-weight: 500;
  font-size: 1rem;
  height: 60px;
  margin-bottom: 10px;
  word-break: normal;
  overflow: auto;
  flex-grow: 1;
  padding-right: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const LinkContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Favicon = styled.div`
  width: 17px;
  height: 17px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) =>
    props.faviconSrc
      ? `background-image: url(${props.faviconSrc});`
      : 'background-color: none;'}
  margin-right: 8px;
`;
// '${}': string안에서 변수를 사용하기 위해서
// {}: jsx에서 js문법을 쓰기 위한 것

const LinkLabel = styled.div`
  font-size: 0.875rem;
  color: var(--color-g5);
`;

const FloatingMenuOverlay = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
