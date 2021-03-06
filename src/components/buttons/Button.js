import React from 'react';
import styled from 'styled-components';

export default function Button({ icon, children, ...rest }) {
  // className: type(primary, secondary, light, danger) small(large small)
  // children: innerText
  // icon: component/element of icon (img, svg...)
  return (
    <button {...rest}>
      {icon ? <IconContainer>{icon}</IconContainer> : null}
      {icon && children ? <IconMargin></IconMargin> : null}
      {children}
    </button>
  );
}

const IconContainer = styled.span`
  position: relative;
  display: inline-block;
  padding: 1px 0 0 0;
  & img {
    height: 1em;
  }
`;

const IconMargin = styled.div`
  width: 8px;
`;
