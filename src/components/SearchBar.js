import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataProvider';
import SearchIcon from './assets/SearchIcon';
import { breakpoints } from '../consts/responsive';
import { XLg } from 'react-bootstrap-icons';

export default function SearchBar({
  isCollapsed,
  setIsCollapsed,
  placeholder,
  ...rest
}) {
  const { windowSize } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const collapseSearchbar = () => {
    // only on mobile
    if (windowSize.width <= breakpoints.sm) {
      setIsCollapsed(true);
    }
  };

  const handleClick = (e) => {
    setIsCollapsed(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputBlur = () => {
    if (!searchQuery && windowSize.width <= breakpoints.sm) collapseSearchbar();
  };

  const clearSearchQuery = (e) => {
    e.stopPropagation();
    setSearchQuery('');
    collapseSearchbar();
  };

  useEffect(() => {
    if (isCollapsed) {
      setSearchQuery('');
    } else {
      inputRef.current.focus();
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (windowSize.width > breakpoints.sm) {
      setIsCollapsed(false);
    } else {
      if (!searchQuery) {
        setIsCollapsed(true);
      }
    }
    // eslint-disable-next-line
  }, [windowSize]);

  return (
    <StyledSearchBar isCollapsed={isCollapsed} onClick={handleClick} {...rest}>
      <SearchIcon loading={false} />
      <input
        type="text"
        value={searchQuery}
        style={{
          margin: '0 8px',
          width: '100%',
          display: isCollapsed ? 'none' : undefined,
        }}
        placeholder={placeholder ? placeholder : '검색...'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
      <XLg
        style={{
          color: 'black',
          display: searchQuery ? 'block' : 'none',
          cursor: 'pointer',
        }}
        onClick={clearSearchQuery}
      />
    </StyledSearchBar>
  );
}

const StyledSearchBar = styled.div`
  border-radius: 18px;
  color: var(--color-primary);
  background-color: var(--color-secondary);
  height: 36px;
  padding: 0 16px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isCollapsed ? 'auto' : '100%')};
  max-width: 728px;
`;
