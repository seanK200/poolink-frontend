import React from 'react';
import ReactModal from 'react-modal';
import { useData } from '../../contexts/DataProvider';

export default function RouteModal({ headerType, children, ...rest }) {
  const { handleRouteModalClose } = useData();

  return (
    <ReactModal
      onRequestClose={handleRouteModalClose}
      className="RouteModal__Content"
      overlayClassName="RouteModal__Overlay"
      portalClassName="RouteModal__Portal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
      {...rest}
    >
      {children}
    </ReactModal>
  );
}
