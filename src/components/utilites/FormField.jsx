import React from 'react';
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
  onBlur: handleBlurProp,
  ...props
}) {
  const {
    value,
    isValid,
    doValidate,
    message,
    handleChangeControl,
    handleBlurControl,
  } = control;

  const handleChange = (e) => {
    handleChangeControl(e);
    if (typeof handleChangeProp === 'function') handleChangeProp(e);
  };

  const handleBlur = (e) => {
    handleBlurControl(e);
    if (typeof handleBlurProp === 'function') handleBlurProp(e);
  };

  const inputElement = () => {
    if (type === 'textarea')
      return (
        <textarea
          className={!doValidate || isValid ? '' : 'invalid'}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        ></textarea>
      );
    if (type === 'select')
      return (
        <FakeInput
          type={type}
          className={!doValidate || isValid ? '' : 'invalid'}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
      );

    return (
      <input
        type={type}
        className={!doValidate || isValid ? '' : 'invalid'}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        {...props}
      />
    );
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>
        {labelText}
        <span className="required">{control.required && '*'}</span>
      </label>
      {inputElement()}
      <div className="input-message">{message}</div>
    </div>
  );
}

function FakeInput({
  className: classNameProp,
  type,
  value,
  disabled,
  placeholder,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={`fake-input ${classNameProp}${value ? '' : ' empty'}`}>
        {value || placeholder || ''}
      </div>
      {type === 'select' && (
        <SelectArrowContainer>
          <ChevronDown />
        </SelectArrowContainer>
      )}
    </React.Fragment>
  );
}

const SelectArrowContainer = styled.div`
  position: absolute;
  top: 50%;
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
