import React from 'react';
import styled from 'styled-components';

export default function GotoButton({ fill, ...rest }) {
  return (
    <StyledGotoButton fill={fill ? fill : '#747474'} {...rest}>
      <svg
        width="7"
        height="10"
        viewBox="0 0 7 10"
        xmlns="http://www.w3.org/2000/svg"
        className="svg-goto-button"
      >
        <path d="M1.79957 0.0771484L6.95801 5.03857L1.79957 10L0.939323 9.17319L5.23873 5.03857L0.939323 0.903955L1.79957 0.0771484Z" />
      </svg>
    </StyledGotoButton>
  );
}

const StyledGotoButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & svg {
    fill: ${(props) => props.fill};
  }
`;
