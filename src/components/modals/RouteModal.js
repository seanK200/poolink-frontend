import React from 'react';
import ReactModal from 'react-modal';
import { useData } from '../../contexts/DataProvider';
import { matchPath } from 'react-router-dom';

export default function RouteModal({ headerType, children, ...rest }) {
  const { handleRouteModalClose } = useData();

  const getModalClassName = () => {
    let className = 'RouteModal__Content';
    if (matchPath({ path: '/link/new' }, '/link/new')) {
      className += ' RouteModal__Content-small';
    }
    return className;
  };

  return (
    <ReactModal
      onRequestClose={handleRouteModalClose}
      className={getModalClassName()}
      overlayClassName="RouteModal__Overlay"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
      {...rest}
    >
      {children}
    </ReactModal>
  );
}
