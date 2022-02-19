import React from 'react';
import Button from './Button';

export default function CopyButton() {
  return (
    <Button
      icon={
        <img
          src={process.env.PUBLIC_URL + '/assets/CopyButton.png'}
          alt="Copy"
        />
      }
      style={{
        width: '30px',
        height: '30px',
        fontSize: '1.1rem',
      }}
    />
  );
}
