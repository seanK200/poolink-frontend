import { useState, useCallback, useEffect } from 'react';

const defaultMessages = {
  valid: '',
  success: '성공',
  invalid: '올바르지 않은 값입니다.',
  required: '필수 입력 항목입니다.',
  tooShort: '너무 짧습니다.',
  tooLong: '너무 깁니다.',
};

const defaultInitValues = {
  value: '',
  isValid: false,
  doValidate: false,
  isDisabled: false,
  message: '',
};

export default function useFieldControl({
  required = true,
  minLen,
  maxLen,
  validator,
  messages,
  initValues,
} = {}) {
  const [value, setValue] = useState(
    initValues?.value || defaultInitValues.value
  );
  const [isValid, setIsValid] = useState(
    initValues?.isValid || defaultInitValues.isValid
  );
  const [doValidate, setDoValidate] = useState(
    initValues?.doValidate || defaultInitValues.doValidate
  );
  const [message, setMessage] = useState(
    initValues?.message || defaultInitValues.message
  );

  const initializeField = useCallback(() => {
    setValue(initValues?.value || defaultInitValues.value);
    setIsValid(initValues?.isValid || defaultInitValues.isValid);
    setDoValidate(initValues?.doValidate || defaultInitValues.doValidate);
    setMessage(initValues?.message || defaultInitValues.message);
  }, [initValues]);

  const validateField = useCallback(() => {
    if (!doValidate) return;
    try {
      if (required && !value)
        throw messages?.required || defaultMessages.required;
      if (minLen && value.length < minLen)
        throw messages?.tooShort || defaultMessages.tooShort;
      if (maxLen && value.length > maxLen)
        throw messages?.tooLong || defaultMessages.tooLong;
      if (typeof validator === 'function') {
        const validatorResult = validator(value);
        if (validatorResult) {
          if (messages && messages.hasOwnProperty(validatorResult)) {
            throw messages[validatorResult];
          } else if (defaultMessages.hasOwnProperty(validatorResult)) {
            throw defaultMessages[validatorResult];
          } else {
            throw messages?.invalid || defaultMessages.invalid;
          }
        }
      }
      setMessage(messages?.valid || defaultMessages.valid);
      setIsValid(true);
      return true;
    } catch (errMsg) {
      if (typeof errMsg === 'string') {
        setMessage(errMsg);
      } else {
        console.log(errMsg);
        setMessage(messages?.invalid || defaultMessages.invalid);
      }
      setIsValid(false);
      return false;
    }
  }, [required, minLen, maxLen, messages, validator, value, doValidate]);

  const handleChangeControl = useCallback(
    (e) => {
      if (!doValidate) setDoValidate(true);
      setValue(e.target.value);
    },
    [doValidate]
  );

  const handleBlurControl = useCallback(
    (e) => {
      if (!doValidate) setDoValidate(true);
    },
    [doValidate]
  );

  useEffect(() => {
    validateField();
    // eslint-disable-next-line
  }, [value, doValidate]);

  const control = {
    value,
    setValue,
    isValid,
    setIsValid,
    doValidate,
    setDoValidate,
    message,
    setMessage,
    initializeField,
    validateField,
    handleChangeControl,
    handleBlurControl,
    required,
  };

  return [value, isValid, control];
}
