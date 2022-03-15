import React from 'react';

export default function Emoji({ symbol, label, ...props }) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
      {...props}
    >
      {symbol}
    </span>
  );
}
