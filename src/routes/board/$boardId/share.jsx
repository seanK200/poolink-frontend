import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/buttons/Button';
import ModalHeader from '../../../components/modals/ModalHeader';
import Form from '../../../components/utilites/Form';
import FormField from '../../../components/utilites/FormField';
import { useAuth } from '../../../contexts/AuthProvider';
import { useData } from '../../../contexts/DataProvider';
import useFieldControl from '../../../hooks/useFieldControl';

const defaultProfileImgSrc =
  process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png';

export default function ShareBoardRoute() {
  const { userProfile } = useAuth();
  const { boards, fetchUserInfo } = useData();
  const { boardId } = useParams();

  const boardInfo = boards[boardId] || null;

  const [inviteUser, isInviteUserValid, inviteUserField] = useFieldControl({
    required: false,
  });

  useEffect(() => {
    if (!boardInfo) return;
    fetchUserInfo({
      params: { id: boardInfo.user },
      useCache: true,
    });
    if (!boardInfo?.invited_users.length) return;
    boardInfo.invited_users.forEach((userId) => {
      fetchUserInfo({ params: { id: userId }, useCache: true });
    });
    // eslint-disable-next-line
  }, [boardInfo]);

  return (
    <React.Fragment>
      <ModalHeader heading="보드 공유하기" />
      <Container
        className="RouteModal__Content-container small autocomplete-container"
        style={{ paddingTop: '0' }}
      >
        <Form style={{ display: 'flex', marginBottom: '8px' }}>
          <FormField
            type="text"
            control={inviteUserField}
            placeholder="초대할 사용자 검색"
            className="no-margin"
          />
          <Button
            className="primary large"
            style={{ flexShrink: '0', marginLeft: '16px' }}
            disabled={!inviteUser || !isInviteUserValid}
          >
            초대
          </Button>
        </Form>
        <InvitedUserList>
          <InvitedUserItem
            userId={boardInfo.user}
            owner={userProfile.userId === boardInfo.user}
          />
          {boardInfo.invited_users.map((userId) => {
            return <InvitedUserItem userId={userId} />;
          })}
        </InvitedUserList>
      </Container>
    </React.Fragment>
  );
}

function InvitedUserItem({ userId, owner }) {
  const { users } = useData();
  const userInfo = users[userId] || null;

  if (!userInfo) return null;

  return (
    <InvitedUserItemContainer>
      <img src={defaultProfileImgSrc} alt="Profile" />
      <div className="invited-user-item__name">{userInfo.name}</div>
      <div className={`invited-user-item__action${owner ? ' owner' : ''}`}>
        {owner ? '소유자' : <Button className="minimal danger">삭제</Button>}
      </div>
    </InvitedUserItemContainer>
  );
}

const Container = styled.div`
  width: 100%;
`;

const InvitedUserList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InvitedUserItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 0;
  & img {
    width: 32px;
    margin-right: 16px;
  }
  & .invited-user-item__name {
    flex-grow: 1;
    font-weight: 500;
  }
  & .invited-user-item__action {
    text-align: right;
  }
  & .invited-user-item__action.owner {
    color: var(--color-g6);
  }
`;
