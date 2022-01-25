import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function DefaultLayout() {
  const [isVisible, setIsVisible] = useState(false); // mobile

  const showSidebar = () => {
    setIsVisible(true);
  };

  const hideSidebar = () => {
    setIsVisible(false);
  };

  return (
    <Container className="no-scrollbar">
      <Sidebar
        isVisible={isVisible}
        showSidebar={showSidebar}
        hideSidebar={hideSidebar}
      />
      <div className="view-container no-scrollbar">
        <Topbar showSidebar={showSidebar} />
        <div className="view-content"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: row;
  overflow: auto;
  @media only screen and (max-width: 768px) {
    padding-left: 0;
  }
`;
