import React, { useRef } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import styled from 'styled-components';

export default function FormField({
  label: labelText,
  type = 'text',
  id,
  disabled = false,
  control,
  textarea,
  onChange: handleChangeProp,
  onFocus: handleFocusProp,
  onBlur: handleBlurProp,
  autoComplete,
  className,
  hideMessage,
  ...props
}) {
  const {
    value,
    isValid,
    doValidate,
    message,
    handleChangeControl,
    handleFocusControl,
    handleBlurControl,
    inputRef,
  } = control;

  const handleChange = (e) => {
    handleChangeControl(e);
    if (typeof handleChangeProp === 'function') handleChangeProp(e);
  };

  const handleFocus = (e) => {
    handleFocusControl(e);
    if (typeof handleFocusProp === 'function') handleFocusProp(e);
  };

  const handleBlur = (e) => {
    handleBlurControl(e);
    if (typeof handleBlurProp === 'function') handleBlurProp(e);
  };

  const handleSelectArrowClick = (e) => {
    e.stopPropagation();
    inputRef?.current?.focus && inputRef.current.focus();
  };

  const inputElement = () => {
    if (type === 'textarea')
      return (
        <textarea
          className={!doValidate || isValid ? '' : 'invalid'}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          ref={inputRef}
          {...props}
        ></textarea>
      );

    return (
      <React.Fragment>
        <input
          type={type}
          className={!doValidate || isValid ? '' : 'invalid'}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          ref={inputRef}
          {...props}
        />
        {type === 'select' && (
          <SelectArrowContainer onClick={handleSelectArrowClick}>
            <ChevronDown />
          </SelectArrowContainer>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={`input-group${className ? ' ' + className : ''}`}>
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          <span className="required">{control.required && '*'}</span>
        </label>
      )}
      <div
        style={{ width: '100%', position: 'relative' }}
        className="input-container"
      >
        {inputElement()}
        {autoComplete}
      </div>
      {hideMessage || <div className="input-message">{message}</div>}
    </div>
  );
}

const SelectArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  color: var(--color-g3);
  padding: 0;
  margin: 0;
  line-height: 0.1;
  font-size: 1rem;
  & svg {
    padding: 0;
    margin: 0;
  }
`;
