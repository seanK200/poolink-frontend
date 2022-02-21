import React, { useEffect } from 'react';
import LinkItem from '../../components/LinkItem';
import styled from 'styled-components';
import CopyButton from '../../components/buttons/CopyButton';
import Button from '../../components/buttons/Button';
import { useData } from '../../contexts/DataProvider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

export default function BoardRoute() {
  const { userProfile } = useAuth();
  const { boards, links, fetchBoard } = useData();
  const { boardId } = useParams();

  const boardInfo = boards[boardId] || null;
  const isMyBoard = boardInfo?.user === userProfile?.userId;

  useEffect(() => {
    fetchBoard({ params: { id: boardId }, useCache: true });
    // eslint-disable-next-line
  }, [boardId]);

  if (boardInfo === null) {
    // TODO Loading screen
    return null;
  }

  return (
    <Container>
      <BoardInfoContainer>
        <Emoji emoji={boardInfo.emoji}>{boardInfo.emoji}</Emoji>
        <RightBoardInfoContainer>
          <BoardNameAndScrapContainer>
            <BoardNameContainer>
              <BoardName>{boardInfo.name}</BoardName>
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
            <Button
              className="primary large"
              icon={
                isMyBoard && (
                  <img
                    src={process.env.PUBLIC_URL + '/assets/AddShareIcon.png'}
                    alt="share"
                  />
                )
              }
            >
              {isMyBoard ? '공유' : '스크랩하기'}
            </Button>
          </BoardNameAndScrapContainer>
          <BoardBio>{boardInfo.bio}</BoardBio>
          <HashTags>#여행 #공간 #힐링</HashTags>
        </RightBoardInfoContainer>
      </BoardInfoContainer>
      <div
        className="view-content no-scrollbar"
        style={{ paddingRight: '32px' }}
      >
        <ToolBar>
          <NumberOfLinks>{`내 링크 ${boardInfo.links.length}개`}</NumberOfLinks>
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
          {boardInfo.links.map((linkId) => (
            <LinkItem linkInfo={links[linkId]} key={linkId} />
          ))}
        </LinkContainer>
      </div>
    </Container>
  );
}

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
  background-color: ${(props) => (props.emoji ? 'none' : 'var(--color-g8)')};
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
