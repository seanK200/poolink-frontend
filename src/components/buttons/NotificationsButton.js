import React from 'react';
import styled from 'styled-components';
import BellSvg from '../assets/BellSvg';
import { useData } from '../../contexts/DataProvider';
import NotificationsModal from '../modals/NotificationsModal';

export default function NotificationsButton({
  onClick: handleClickProp,
  ...props
}) {
  const { setNotiModalOpen } = useData();
  const handleClick = (e) => {
    setNotiModalOpen(true);
    typeof handleClickProp === 'function' && handleClickProp(e);
  };
  return (
    <React.Fragment>
      <Container onClick={handleClick} {...props}>
        {BellSvg}
      </Container>
      <NotificationsModal />
    </React.Fragment>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

// const NotificationModal = styled.div`
//   position: absolute;
//   top: 40px;
//   right: 0px;
//   z-index: 1;
//   width: 384px;
//   height: 400px;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
//   background-color: white;
// `;
