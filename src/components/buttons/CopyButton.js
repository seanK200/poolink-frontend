import React from 'react';
import Button from './Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CopyButton({ text }) {
  return (
    <CopyToClipboard
      text={text}
      onCopy={(text, result) => {
        alert(
          `클립보드로 ${result ? '복사되었' : '복사 실패하였'}습니다. (${text})`
        );
      }}
    >
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
    </CopyToClipboard>
  );
}
