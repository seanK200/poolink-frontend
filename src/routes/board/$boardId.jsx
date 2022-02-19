import React from 'react';
import LinkItem from '../../components/LinkItem';
import styled from 'styled-components';
import CopyButton from '../../components/buttons/CopyButton';
import Button from '../../components/buttons/Button';

export default function BoardRoute({ boardInfo }) {
  return (
    <Container>
      <BoardInfoContainer>
        <Emoji />
        <RightBoardInfoContainer>
          <BoardNameAndScrapContainer>
            <BoardNameContainer>
              <BoardName>내이름은보드다</BoardName>
              <ButtonsContainer>
                <Button
                  icon={
                    <img
                      src={process.env.PUBLIC_URL + '/assets/EditIcon.png'}
                      alt="Edit"
                    />
                  }
                  style={{
                    width: '30px',
                    height: '30px',
                    fontSize: '1.1rem',
                    margin: '0 14px',
                  }}
                />
                <CopyButton style={{ margin: '0 14px' }} />
                <Button
                  icon={
                    <img
                      src={process.env.PUBLIC_URL + '/assets/DeleteIcon.png'}
                      alt="Delete"
                    />
                  }
                  style={{
                    width: '30px',
                    height: '30px',
                    fontSize: '1.1rem',
                    margin: '0 14px',
                  }}
                />
              </ButtonsContainer>
            </BoardNameContainer>
            <BlueButton>공유하기</BlueButton>
          </BoardNameAndScrapContainer>
          <BoardBio>
            보드메모이것은보드메모입니다저것은보드메모입니다보드메오메보ㅔㅗㅔ오로오램어런ㅇㅁ런머랜어래ㅔㅓㄴ애ㅔ럼ㄴ애ㅔ러ㅔㅐㄴ머레ㅐㄴ어ㅐ
          </BoardBio>
          <HashTags>#여행 #공간 #힐링</HashTags>
        </RightBoardInfoContainer>
      </BoardInfoContainer>
      <div
        className="view-content no-scrollbar"
        style={{ paddingRight: '32px' }}
      >
        <ToolBar>
          <NumberOfLinks>내 링크 2개</NumberOfLinks>
          <SelectAndViewModeContainer>
            <Button
              className="minimal"
              icon={
                <img
                  src={process.env.PUBLIC_URL + '/assets/SelectIcon.png'}
                  alt="Select"
                />
              }
              style={{ marginRight: '14px' }}
            >
              선택하기
            </Button>
            <Button
              className="minimal"
              icon={
                <img
                  src={process.env.PUBLIC_URL + '/assets/GridIcon.png'}
                  alt="ChangeViewMode"
                />
              }
            ></Button>
          </SelectAndViewModeContainer>
        </ToolBar>
        <LinkContainer>
          <LinkItem linkInfo={linkInfo} />
          <LinkItem linkInfo={linkInfo2} />
          <LinkItem linkInfo={linkInfo} />
          <LinkItem linkInfo={linkInfo2} />
          <LinkItem linkInfo={linkInfo} />
          <LinkItem linkInfo={linkInfo2} />
        </LinkContainer>
      </div>
    </Container>
  );
}

const linkInfo = {
  metaImageSrc: '',
  name: '윤선쓰스스스',
  memo: '멤메멤메메메멤메모메메메메메메메메메메메멤ㅁㅁㅁ메메메메모',
  faviconSrc: '',
  url: 'www.naver.com',
};

const linkInfo2 = {
  metaImageSrc: '',
  name: '윤선쓰스스스',
  faviconSrc: '',
  url: 'www.nate.com',
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BoardInfoContainer = styled.div`
  width: 100%;
  display: flex;
  padding-right: 32px;
`;

const Emoji = styled.div`
  width: 88px;
  height: 88px;
  background-color: #899999;
  margin-right: 30px;
`;

const RightBoardInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BoardNameAndScrapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 14px 0;
`;

const BoardNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BoardName = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 3rem;
  color: black;
  margin-right: 20px;
`;
/*이름을 너무 길게 쓰면 오똑하지*/

const ButtonsContainer = styled.div`
  display: flex;
`;

const BlueButton = styled.button`
  width: 130px;
  height: 44px;
  border-radius: 10px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.5rem;
  background-color: var(--color-primary);
  color: white;
`;

const BoardBio = styled.div`
  width: 100%;
  height: 75px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-g3);
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HashTags = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-g5);
  margin: 0 0 24px 0;
`;

const ToolBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NumberOfLinks = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0 0 11px 11px;
  color: var(--color-g5);
`;

const SelectAndViewModeContainer = styled.div`
  display: flex;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;
