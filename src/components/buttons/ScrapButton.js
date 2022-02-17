import React from 'react';
import Button from './Button';

export default function ScrapButton() {
  return (
    <Button
      icon={
        <img
          src={process.env.PUBLIC_URL + '/assets/ScrapIcon.png'}
          alt="Scrap"
        />
      }
      style={{
        width: '25px',
        height: '25px',
        fontSize: '1.1rem',
        marginRight: '5px',
      }}
    />
  );
}
