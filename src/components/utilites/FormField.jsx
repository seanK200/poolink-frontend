import React from 'react';
import { ChevronDown, XLg } from 'react-bootstrap-icons';
import styled from 'styled-components';
import TagInput from './TagInput';
import EmojiPicker from 'emoji-picker-react';
import { emojiPlaceholder, emojiGroupNames } from '../../consts/strings';
import Emoji from './Emoji';

export default function FormField({
  label: labelText,
  labelImgSrc,
  labelImgAlt,
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

  const handleEmojiClick = (e, emojiObject) => {
    handleChangeControl(emojiObject.emoji);
    handleBlur(e);
  };

  const handleEmojiClear = () => {
    handleChangeControl(null);
  };

  const displayValue =
    typeof displayValueProp === 'function' ? displayValueProp(value) : value;

  const getFakeInputClassName = () => {
    let inputClassName = 'fake-input';
    if (!displayValue) inputClassName += ' empty';
    if (doValidate && !isValid) inputClassName += ' invalid';
    if (focused) inputClassName += ' focus';
    if (disabled) inputClassName += ' disabled';
    return inputClassName;
  };

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
    } else if (type === 'select') {
      return (
        <React.Fragment>
          <div
            className={getFakeInputClassName()}
            onClick={handleFakeInputClick}
            ref={inputRef}
            placeholder={placeholder}
            {...props}
          >
            {displayValue}
          </div>
          <SelectArrowContainer onClick={handleSelectArrowClick}>
            <ChevronDown />
          </SelectArrowContainer>
          <SelectOverlay onClick={handleSelectOverlayClick} focused={focused} />
        </React.Fragment>
      );
    } else if (type === 'tag') {
      return (
        <TagInput
          control={control}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    } else if (type === 'emoji') {
      const emojiDisplayValue =
        typeof displayValueProp === 'function' ? (
          displayValueProp(value)
        ) : value ? (
          <Emoji
            symbol={value}
            style={{ fontSize: '3rem', cursor: 'pointer', lineHeight: 1 }}
            onClick={handleFakeInputClick}
          />
        ) : (
          ''
        );

      return (
        <React.Fragment>
          {value ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <EmojiContainer>{emojiDisplayValue}</EmojiContainer>
              <ClearEmoji>
                <XLg onClick={handleEmojiClear} />
              </ClearEmoji>
            </div>
          ) : (
            <div
              className={getFakeInputClassName()}
              onClick={handleFakeInputClick}
              ref={inputRef}
              placeholder={placeholder}
              {...props}
            ></div>
          )}
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            groupNames={emojiGroupNames}
            searchPlaceholder={emojiPlaceholder}
            pickerStyle={{
              position: 'absolute',
              backgroundColor: '#FFFFFFFF',
              zIndex: 1,
              display: focused ? undefined : 'none',
            }}
            native={true}
            disableSearchBar={true}
          />
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
    <div className={`input-group`}>
      {(labelText || labelImgSrc) && (
        <label htmlFor={id} className={!doValidate || isValid ? '' : 'invalid'}>
          {labelImgSrc && (
            <img src={labelImgSrc} alt={labelImgAlt || labelText} />
          )}
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

const EmojiContainer = styled.div`
  &:hover {
    background-color: var(--color-g8);
  }
`;

const ClearEmoji = styled.div`
  display: flex;
  font-size: 0.75rem;
  cursor: pointer;
  margin-left: 2px;
`;
