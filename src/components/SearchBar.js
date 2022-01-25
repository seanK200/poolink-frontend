import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from './assets/SearchIcon';

export default function SearchBar({
  isCollapsed,
  setIsCollapsed,
  placeholder,
  ...rest
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const handleClick = (e) => {
    setIsCollapsed((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputBlur = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    if (isCollapsed) {
      setSearchQuery('');
    } else {
      inputRef.current.focus();
    }
  }, [isCollapsed]);

  return (
    <StyledSearchBar onClick={handleClick} {...rest}>
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
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
    </StyledSearchBar>
  );
}

const StyledSearchBar = styled.div`
  border-radius: 18px;
  color: var(--color-secondary);
  background-color: var(--bg-color-secondary);
  height: 36px;
  padding: 0 16px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
