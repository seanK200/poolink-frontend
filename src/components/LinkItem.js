import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CopyButton from './buttons/CopyButton';
import MenuButton from './buttons/MenuButton';
import FloatingMenu from './FloatingMenu';
import FloatingMenuItem from './FloatingMenuItem';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LINK_DELETE_WARNING } from '../consts/strings';

export function getDomainName(url, truncateLength = 50) {
  let domainName = url;
  const protocolSplit = domainName.split('//');
  domainName = protocolSplit.length > 1 ? protocolSplit[1] : protocolSplit[0];
  domainName = domainName.split('/')[0];
  if (domainName.length > truncateLength) {
    domainName = domainName.substr(0, truncateLength - 3) + '...';
  }
  return domainName;
}

export default function LinkItem({ linkInfo, deleteLinkState, deleteLink }) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const handleLinkEdit = () => {
    navigate(`/link/${linkInfo.link_id}`, {
      state: { backgroundLocation: location },
    });
  };

  // Delete link API
  const handleLinkDelete = () => {
    if (window.confirm(LINK_DELETE_WARNING)) {
      deleteLink({ params: { id: linkInfo.link_id } });
    }
  };

  const linkFloatingMenu = (
    <FloatingMenu
      style={{ right: '0px' }}
      onClick={() => {
        setMenuVisible(false);
      }}
    >
      <FloatingMenuItem
        label="수정"
        imgSrc="/assets/EditIcon.png"
        onClick={handleLinkEdit}
      />
      <CopyToClipboard text={linkInfo.url}>
        <FloatingMenuItem label="링크 복사" imgSrc="/assets/CopyButton.png" />
      </CopyToClipboard>
      <FloatingMenuItem
        label="링크 삭제"
        imgSrc="/assets/DeleteIcon.png"
        onClick={handleLinkDelete}
      />
    </FloatingMenu>
  );

  if (!linkInfo) return null;

  return (
    <React.Fragment>
      <Container
        isMenuVisible={isMenuVisible}
        isDeleting={deleteLinkState.loading}
      >
        <LinkMetaImage metaImageSrc={linkInfo.meta_image} />
        <LinkInfoContainer>
          <LinkNameAndButtonContainer>
            <LinkName>{linkInfo.label}</LinkName>
            <ButtonContainer>
              <CopyButton text={linkInfo.url} />
              <MenuButton
                onClick={() => {
                  setMenuVisible((prev) => !prev);
                }}
              />
            </ButtonContainer>
            {isMenuVisible && linkFloatingMenu}
            <FloatingMenuOverlay
              onClick={() => {
                setMenuVisible(false);
              }}
              visible={isMenuVisible}
            />
          </LinkNameAndButtonContainer>
          <LinkMemo className="no-scrollbar" memo={linkInfo.memo}>
            {linkInfo.memo}
          </LinkMemo>
          <LinkUrlContainer>
            <Favicon faviconSrc={linkInfo.favicon} />
            <LinkUrl>{getDomainName(linkInfo.url)}</LinkUrl>
          </LinkUrlContainer>
        </LinkInfoContainer>
      </Container>
      <FloatingMenuOverlay
        onClick={() => {
          setMenuVisible(false);
        }}
        visible={isMenuVisible}
      />
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 288px;
  background-color: white;
  filter: drop-shadow(0 0 8px rgba(219, 224, 231, 0.7));
  margin: 11px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ isMenuVisible }) => (isMenuVisible ? '2' : '0')};
  opacity: ${({ isDeleting }) => (isDeleting ? '0.2' : '1')};
`;

const LinkMetaImage = styled.div`
  width: 100%;
  height: 140px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) =>
    props.metaImageSrc
      ? `background-image: url(${props.metaImageSrc});`
      : `background-color: #C4C4C4;`}
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid var(--color-g8);
`;

const LinkInfoContainer = styled.div`
  wdith: 100%;
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
`;

const LinkNameAndButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkName = styled.div`
  font-family: Pretendard;
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-g1);
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const LinkMemo = styled.div`
  width: 100%;
  height: 40px;
  ${(props) => {
    return props.memo ? 'margin: 16px 0 8px 0;' : '';
    /*
    기본적으로 (화살표)함수를 사용했으면 무언가를 return 해야함
    만약 return할 것이 한 줄이면 ( )를 생략할 수 있음( { }랑 노상관)
    함수 안에 return문 밖에 없으면 return 과 { }를 생략할 수 있음
    */
  }}
  font-family: Pretendard;
  font-weight: normal;
  font-size: 0.85rem;
  line-height: 1.1rem;
  color: var(--color-g5);
  overflow: scroll;
`;

const LinkUrlContainer = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  align-items: center;
`;

const Favicon = styled.div`
  width: 12px;
  height: 12px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) =>
    props.faviconSrc
      ? `background-image: url(${props.faviconSrc});`
      : `background-color: #C4C4C4;`}
  margin-right: 8px;
`;

const LinkUrl = styled.div`
  height: 18px;
  font-family: Pretendard;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.1rem;
  color: var(--color-g6);
  overflow-y: hidden;
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
