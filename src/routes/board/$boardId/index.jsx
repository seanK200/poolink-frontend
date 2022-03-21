import React, { useEffect } from 'react';
import LinkItem from '../../../components/LinkItem';
import styled from 'styled-components';
import CopyButton from '../../../components/buttons/CopyButton';
import Button from '../../../components/buttons/Button';
import { useData } from '../../../contexts/DataProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider';
import Emoji from '../../../components/utilites/Emoji';
import { BOARD_DELETE_WARNING } from '../../../consts/strings';
import useFetch from '../../../hooks/useFetch';

export default function BoardRoute() {
  const { userProfile } = useAuth();
  const { boards, links, fetchBoard } = useData();
  const { boardId } = useParams();
  let navigate = useNavigate();
  let location = useLocation();

  const boardInfo = boards[boardId] || null;
  const isMyBoard = boardInfo?.user === userProfile?.userId;

  useEffect(() => {
    fetchBoard({ params: { id: boardId }, useCache: true });
    // eslint-disable-next-line
  }, [boardId]);

  const handleEditBoardClick = (e) => {
    navigate('edit', { state: { backgroundLocation: location } });
  };

  const [deleteBoardState, deleteBoard] = useFetch('DELETE', '/boards/:id/');

  const handleBoardDelete = (e) => {
    if (!isMyBoard) return;
    if (deleteBoardState.loading) return;
    if (!window.confirm(BOARD_DELETE_WARNING)) return;
    deleteBoard({ params: { id: boardId } });
  };

  useEffect(() => {
    if (deleteBoardState.loading) return;
    if (deleteBoardState.err) {
      alert('보드 삭제에 실패하였습니다.');
    } else if (deleteBoardState.res) {
      navigate('/');
    }

    // eslint-disable-next-line
  }, [deleteBoardState]);

  if (boardInfo === null) {
    // TODO Loading screen
    return null;
  }

  return (
    <Container>
      <BoardInfoContainer>
        {boardInfo.emoji && (
          <Emoji
            symbol={boardInfo.emoji}
            style={{ fontSize: '4rem', marginRight: '32px' }}
          />
        )}
        <RightBoardInfoContainer>
          <BoardNameAndBlueButtonContainer>
            <BoardNameContainer>
              <BoardName>{boardInfo.name}</BoardName>
              <ButtonsContainer>
                <Button
                  onClick={handleEditBoardClick}
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
                <CopyButton
                  style={{ margin: '0 14px' }}
                  text={
                    window.location.protocol +
                    '//' +
                    window.location.host +
                    location.pathname
                  }
                />
                {isMyBoard && (
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
                    onClick={handleBoardDelete}
                  />
                )}
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
          </BoardNameAndBlueButtonContainer>
          <BoardBio className="no-scrollbar">{boardInfo.bio}</BoardBio>
          <HashTags>
            {boardInfo?.tags?.length
              ? '#' + boardInfo.tags.map((tag) => tag.name).join(' #')
              : ''}
          </HashTags>
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
  padding: 0 32px;
`;

// const Emoji = styled.div`
//   width: 88px;
//   height: 88px;
//   background-color: ${(props) => (props.emoji ? 'none' : 'var(--color-g8)')};
//   margin-right: 30px;
//   flex-shrink: 0;
// `;

const RightBoardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BoardNameAndBlueButtonContainer = styled.div`
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
  font-size: 2rem;
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
  max-width: 100%;
  height: 75px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-g3);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`;

const HashTags = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-g5);
  margin: 16px 0 24px 0;
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
  @media only screen and (max-width: 680px) {
    justify-content: center;
  }
`;
