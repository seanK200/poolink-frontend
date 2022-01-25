import React from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import ModalHeader from './ModalHeader';

export default function RouteModal({ headerType, children, ...rest }) {
  let navigate = useNavigate();

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <ReactModal
      onRequestClose={handleModalClose}
      className="RouteModal__Content"
      overlayClassName="RouteModal__Overlay"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
      {...rest}
    >
      {headerType && (
        <ModalHeader headerType={headerType} onModalClose={handleModalClose} />
      )}
      {children}
    </ReactModal>
  );
}
