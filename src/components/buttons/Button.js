import React from 'react';
import styled from 'styled-components';

export default function Button({ icon, children, ...rest }) {
  // className: primary small
  // children: innerText
  // icon: component/element of icon (img, svg...)
  return (
    <button {...rest}>
      {icon ? <IconContainer>{icon}</IconContainer> : null}
      {children}
    </button>
  );
}

const IconContainer = styled.span`
  position: relative;
  display: inline;
  margin: 0 4px 0 0;
  padding: 0;
`;
