import React from 'react';
import SearchSvg from './SearchSvg';
import Loader from './Loader';

export default function SearchIcon({ loading }) {
  if (loading) return <Loader />;
  return (
    <div
      style={{
        flexShrink: '0',
        padding: '0',
        margin: '0',
        position: 'relative',
        top: '1px',
      }}
    >
      {SearchSvg}
    </div>
  );
}
