import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BoardsLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
