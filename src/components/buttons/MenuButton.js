import React from 'react';
import Button from './Button';

export default function MenuButton(props) {
  return (
    <Button
      icon={
        <img
          src={process.env.PUBLIC_URL + '/assets/KebabButton.png'}
          alt="Menu"
        />
      }
      style={{
        width: '25px',
        height: '25px',
        fontSize: '1.1rem',
      }}
      {...props}
    />
  );
}
