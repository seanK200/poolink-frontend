import React, { useEffect, useState } from 'react';
import { XLg, PlusLg } from 'react-bootstrap-icons';
import styled from 'styled-components';

const separateBy = (value, delimiter) => {
  let cleanedValue = '';

  // Add space in front of delimiter
  let idx = 0;
  let pIdx = value.indexOf(delimiter, idx);
  while (pIdx >= 0) {
    cleanedValue += value.slice(idx, pIdx);
    if (
      pIdx > 0 && // Skip first tag
      value[pIdx - 1] !== ' ' &&
      pIdx - idx > 1 // Skip empty tags
    ) {
      cleanedValue += ' ';
    }

    idx = pIdx + 1;
    pIdx = value.indexOf(delimiter, idx);
  }

  // Anything remaining
  if (idx < value.length) {
    cleanedValue += value.slice(idx);
  }

  return cleanedValue;
};

const parseInput = (value) => {
  // Ensure spaces between separators
  value = separateBy(value, '#');
  value = separateBy(value, ',');

  // Clean whitespaces
  value = value.replace(/(\s){2,}/g, ' '); // consecutive whitespaces
  value = value.replace(/^(\s){1,}|(\s){1,}$/g, ''); // trailing whitespaces
  value = value.replace(/["';]/g, '');

  // Array of tags. Unique
  const tags = value
    .split(' ')
    .filter((tag, idx, arr) => arr.indexOf(tag) === idx);

  // Return
  return tags;
};

export default function TagInput(props) {
  const {
    control,
    placeholder,
    disabled,
    onChange: handleChangeProp,
    onFocus: handleFocusProp,
    onBlur: handleBlurProp,
  } = props;

  const {
    handleFocusControl,
    handleBlurControl,
    doValidate,
    isValid,
    focused,
    inputRef,
    initValues,
  } = control;

  const [tags, setTags] = useState(() => {
    if (initValues?.value) {
      return initValues.value;
    }
    return [];
  });
  const [enteredValue, setEnteredValue] = useState('');

  const handleFocus = (e) => {
    typeof handleFocusProp === 'function' && handleFocusProp(e);
    handleFocusControl(e);
  };

  const handleBlur = (e) => {
    typeof handleBlurProp === 'function' && handleBlurProp(e);
    handleBlurControl(e);

    // parse input
    setTags(() => parseInput(enteredValue));
  };

  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault(); // prevent form from submitting
      handleBlur(e);
    }
  };

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleTagContainerClick = (e) => {
    if (!focused) toggleEdit(e);
  };

  const toggleEdit = (e) => {
    handleFocus(e);
  };

  const handleHashTagDeleteClick = (e) => {
    e.stopPropagation();
    const tagNameToDelete = e.target.getAttribute('tagname');
    setTags((prev) => prev.filter((tagName) => tagName !== tagNameToDelete));
  };

  useEffect(() => {
    const newValue = '#' + tags.join(' #');
    setEnteredValue(newValue);
    handleChangeProp(tags);
    // eslint-disable-next-line
  }, [tags]);

  useEffect(() => {
    if (focused && inputRef.current) inputRef.current.focus();
  }, [focused, inputRef]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <TagContainer show={!focused} onClick={handleTagContainerClick}>
        {tags &&
          tags.map((tagName) => (
            <HashTag
              key={tagName}
              name={tagName}
              onDelete={handleHashTagDeleteClick}
            />
          ))}
        <AddHashTag />
      </TagContainer>
      <input
        type="text"
        className={!doValidate || isValid ? '' : 'invalid'}
        style={{ visibility: !focused ? 'hidden' : 'visible' }}
        placeholder={placeholder}
        value={enteredValue}
        disabled={disabled}
        ref={inputRef}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export function HashTag({ name, onDelete: handleDelete }) {
  return (
    <StyledHashTag>
      {name}
      <XLg
        style={{ fontSize: '0.75rem', marginLeft: '8px', cursor: 'pointer' }}
        tagname={name}
        onClick={handleDelete}
      />
    </StyledHashTag>
  );
}

export function AddHashTag({ onClick: handleClick }) {
  return (
    <StyledHashTag className="add" onClick={handleClick}>
      <PlusLg
        style={{
          fontSize: '0.75rem',
          marginRight: '4px',
          cursor: 'pointer',
        }}
      />
      태그 추가
    </StyledHashTag>
  );
}

const StyledHashTag = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: black;
  border: 1px solid var(--color-g7);
  border-radius: 16px;
  padding: 0 12px;
  margin: 0 8px 8px 0;
  font-weight: 500;
  &:last-child {
    margin-right: 0;
  }
  &.add {
    border-color: var(--color-primary);
    color: var(--color-primary);
    cursor: pointer;
  }
  &.add: hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

const TagContainer = styled.div`
  position: absolute;
  display: ${({ show }) => (show === false ? 'none' : 'flex')};
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`;
