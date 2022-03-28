import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useData } from '../../contexts/DataProvider';
import ModalHeader from './ModalHeader';
import Button from '../buttons/Button';
import { getPrettyTimeDiff } from '../../consts/timeprint';

const defaultProfileImgSrc =
  process.env.PUBLIC_URL + '/assets/DefaultProfileImage.png';

export default function NotificationsModal() {
  const { handleNotiModalClose, isNotiModalOpen, notifications } = useData();
  return (
    <ReactModal
      isOpen={isNotiModalOpen}
      className="NotiModal__Content"
      overlayClassName="NotiModal__Overlay"
      portalClassName="NotiModal__Portal"
      onRequestClose={handleNotiModalClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={150}
    >
      <ModalHeader
        heading="알림"
        headerType="small"
        onModalClose={handleNotiModalClose}
      />
      <NotificationList className="no-scrollbar">
        {notifications &&
          notifications.map((notificationInfo) => {
            <NotificationItem notificationInfo={notificationInfo} />;
          })}
        {notifications && !notifications?.length && (
          <NoNotifications>알림이 없습니다.</NoNotifications>
        )}
      </NotificationList>
    </ReactModal>
  );
}

function NotificationItem({ notificationInfo }) {
  const { boards, users } = useData();
  const { sender, receiver, board, status, created } = notificationInfo;

  if (!boards || !users) return null;

  return (
    <NotificationItemContainer>
      <img src={defaultProfileImgSrc} alt="Profile" />
      <div className="notification-message-container">
        <NotificationMessage>
          <span className="bold">
            {users[sender] ? users[sender].name : ''}{' '}
          </span>
          님이&nbsp;
          <span className="bold">
            {users[receiver] ? users[receiver].name : ''}{' '}
          </span>
          님을&nbsp;
          <span className="bold">
            {boards[board] ? boards[board].name : ''}
          </span>
          보드에 회원님을 초대했습니다.
        </NotificationMessage>
        <NotificationTime>{getPrettyTimeDiff(created)}</NotificationTime>
      </div>
      {status === 0 && (
        <div className="notification-action-container">
          <Button className="secondary small" style={{ marginRight: '8px' }}>
            수락
          </Button>
          <Button className="gray small">거절</Button>
        </div>
      )}
    </NotificationItemContainer>
  );
}

const NotificationList = styled.div`
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const NoNotifications = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-g6);
`;

const NotificationItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  & img {
    width: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 16px;
  }
  & .notification-message-container {
    display: flex;
    flex-direction: column;
    margin-right: 8px;
  }
  & .notification-action-container {
    display: none;
    flex-direction: row;
    flex-shrink: 0;
  }
  & .notification-action-container {
    display: flex;
  }
  & p {
    display: block;
    line-height: 1.4;
    padding: 0;
    margin: 0 0 8px 0;
  }
`;

const NotificationMessage = styled.p`
  font-size: 0.875rem;
  color: black;
  & .bold {
    font-weight: 600;
  }
`;

const NotificationTime = styled.p`
  font-size: 0.75rem;
  color: var(--color-g6);
`;

const unreadIndicator = styled.div``;
