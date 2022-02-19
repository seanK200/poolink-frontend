import React from 'react';
import styled from 'styled-components';
import CopyButton from './buttons/CopyButton';
import MenuButton from './buttons/MenuButton';

export default function LinkItem({ linkInfo }) {
  return (
    <Container>
      <LinkMetaImage metaImageSrc={linkInfo.metaImageSrc} />
      <LinkInfoContainer>
        <LinkNameAndButtonContainer>
          <LinkName>{linkInfo.name}</LinkName>
          <ButtonContainer>
            <CopyButton />
            <MenuButton />
          </ButtonContainer>
        </LinkNameAndButtonContainer>
        <LinkMemo memo={linkInfo.memo}>{linkInfo.memo}</LinkMemo>
        <LinkUrlContainer>
          <Favicon faviconSrc={linkInfo.favicon} />
          <LinkUrl>{linkInfo.url}</LinkUrl>
        </LinkUrlContainer>
      </LinkInfoContainer>
    </Container>
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
`;

const LinkMetaImage = styled.img`
  width: 100%;
  height: 140px;
  background-position: center center;
  background-repeat: no-repeat;
  ${(props) =>
    props.metaImageSrc
      ? `background-image: url(${props.metaImageSrc})`
      : `background-color: #C4C4C4;`}
  border-radius: 10px 10px 0 0;
`;

const LinkInfoContainer = styled.div`
  wdith: 100%;
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
`;

const LinkNameAndButtonContainer = styled.div`
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
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
      ? `backgounrd-image: url(${props.faviconSrc});`
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
