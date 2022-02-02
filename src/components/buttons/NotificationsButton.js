import React from 'react';
import styled from 'styled-components';
import BellSvg from '../assets/BellSvg';

export default function NotificationsButton({ ...props }) {
  return <Container {...props}>{BellSvg}</Container>;
}

const Container = styled.div``;
