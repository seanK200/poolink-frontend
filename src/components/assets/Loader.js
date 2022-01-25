import React from 'react';
import styled from 'styled-components';

export default function Loader({ size }) {
  return (
    <LoaderContainer size={size}>
      <div className="dot left"></div>
      <div className="dot mid"></div>
      <div className="dot right"></div>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  --size: ${(props) => (props.size ? props.size : '16px')};
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .dot {
    flex-shrink: 0;
    width: calc(var(--size) / 4);
    height: calc(var(--size) / 4);
    background-color: var(--bg-color-primary);
    border-radius: 50%;
    animation: loading 0.9s linear infinite alternate;
  }
  & .left {
    animation-delay: -0.3s;
  }
  & .mid {
    animation-delay: 0s;
  }
  & .right {
    animation-delay: 0.3s;
  }
  @keyframes loading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// const StyledLoader = styled.div`
//   border: 2px solid var(--bg-color-primary);
//   border-top: 2px solid var(--color-primary);
//   border-radius: 50%;
//   width: ${(props) => (props.size ? props.size : '16px')};
//   height: ${(props) => (props.size ? props.size : '16px')};
//   animation: spin 2s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;
