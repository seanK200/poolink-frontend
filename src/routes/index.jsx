import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { breakpoints } from '../consts/responsive';

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
        <Outlet />
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
  @media only screen and (max-width: ${breakpoints.sm}px) {
    padding-left: 0;
  }
`;
