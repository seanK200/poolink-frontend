import { useEffect, useState, useCallback } from 'react';

const PREFIX = 'poolink-';

export default function useLocalStorage(
  key,
  initialValue,
  listenForChange = true
) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  const storageListener = useCallback(
    (e) => {
      if (e.key === prefixedKey && e.oldValue !== e.newValue) {
        setValue(e.newValue);
      }
    },
    [prefixedKey]
  );

  const setValueCallback = useCallback(
    (...args) => {
      setValue(...args);
    },
    [setValue]
  );

  // detect changes from another window
  useEffect(() => {
    if (listenForChange) {
      window.addEventListener('storage', storageListener);
    }
    return () => {
      if (listenForChange)
        window.removeEventListener('storage', storageListener);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValueCallback];
}
