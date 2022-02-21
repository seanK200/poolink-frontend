import React, { useRef } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import styled from 'styled-components';

export default function FormField({
  label: labelText,
  type = 'text',
  id,
  placeholder,
  disabled = false,
  control,
  textarea,
  onChange: handleChangeProp,
  onFocus: handleFocusProp,
  onBlur: handleBlurProp,
  autoComplete,
  className,
  hideMessage,
  customSelect,
  displayValue: displayValueProp,
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
    focused,
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

  const handleInputClick = (e) => {
    inputRef?.current?.focus && inputRef.current.focus();
  };

  const handleFakeInputClick = (e) => {
    if (!focused && !disabled) handleFocus();
  };

  const handleSelectArrowClick = (e) => {
    focused ? handleBlur() : handleFocus();
  };

  const handleSelectOverlayClick = (e) => {
    handleBlur();
  };

  const displayValue =
    typeof displayValueProp === 'function' ? displayValueProp(value) : value;

  const inputElement = () => {
    if (type === 'textarea') {
      return (
        <textarea
          className={!doValidate || isValid ? '' : 'invalid'}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          ref={inputRef}
          {...props}
        ></textarea>
      );
    }

    if (type === 'select') {
      let inputClassName = 'fake-input';
      if (!displayValue) inputClassName += ' empty';
      if (doValidate && !isValid) inputClassName += ' invalid';
      if (focused) inputClassName += ' focus';
      return (
        <React.Fragment>
          <div
            className={inputClassName}
            onClick={handleFakeInputClick}
            ref={inputRef}
          >
            {displayValue ? displayValue : placeholder}
          </div>
          <SelectArrowContainer onClick={handleSelectArrowClick}>
            <ChevronDown />
          </SelectArrowContainer>
          <SelectOverlay onClick={handleSelectOverlayClick} focused={focused} />
        </React.Fragment>
      );
    }

    return (
      <input
        type={type}
        className={!doValidate || isValid ? '' : 'invalid'}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        ref={inputRef}
        {...props}
      />
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
        className={`input-container${!doValidate || isValid ? '' : ' invalid'}`}
        onClick={handleInputClick}
      >
        {inputElement()}
        {type === 'select' ? customSelect : autoComplete}
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

const SelectOverlay = styled.div`
  display: ${({ focused }) => (focused ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
