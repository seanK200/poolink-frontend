import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useData } from '../../contexts/DataProvider';

export default function CustomSelect({ control, isInModal, children }) {
  const { inputRef, focused, handleBlurControl } = control;
  const { windowSize } = useData();
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);

  // decide the y-position relative to the
  const resolvePosition = useCallback(() => {
    if (!inputRef?.current || !containerRef?.current) return;
    let newPosition = 0; // final position (css top) value, in pixels

    const { height: inputHeight, y: inputY } =
      inputRef.current.getBoundingClientRect();
    const { height: containerHeight } =
      containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const margin = 8;

    const isBottomClipping =
      inputY + inputHeight + containerHeight > windowHeight;

    const offsetTop = inputRef.current.closest('.input-container').offsetTop;
    const scrollContainer = inputRef.current.closest('.autocomplete-container');
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

    if (isInModal) {
      newPosition = offsetTop - scrollTop;
      if (isBottomClipping) {
        newPosition -= containerHeight + margin;
      } else {
        newPosition += inputHeight + margin;
      }
    } else {
      newPosition = inputHeight + margin;
      if (isBottomClipping) {
        newPosition = 0 - containerHeight - margin;
      }
    }
    setPosition(newPosition);
  }, [inputRef, isInModal, containerRef]);

  const handleScroll = throttle(() => {
    handleBlurControl();
  }, 500);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!inputRef?.current) return;
    const inputElem = inputRef.current;
    const scrollContainer = inputElem.closest('.autocomplete-container');
    if (!scrollContainer) return;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [inputRef]);

  useEffect(() => {
    if (focused) resolvePosition();
  }, [focused, windowSize, resolvePosition]);

  return (
    <Container
      position={position}
      focused={focused}
      isInModal={isInModal}
      isVisible={focused}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: ${({ isInModal }) => (isInModal ? 'fixed' : 'absolute')};
  top: ${({ position }) => position}px;
  left: 0px;
  width: 100%;
  z-index: 1;
`;
