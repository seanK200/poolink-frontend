import React from 'react';
import styled from 'styled-components';

export default function DividerLine({ color, margin }) {
  return (
    <StyledDividerLine
      color={color ? color : '#D3D3D3'}
      margin={margin ? margin : '24px 0'}
    />
  );
}

const StyledDividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.color};
  border: none;
  margin: ${(props) => props.margin};
`;
