import { useRef, useEffect } from 'react';

export default function useTimeout() {
  const timeoutRef = useRef(null);

  const mySetTimeout = (callback, delay) => {
    timeoutRef.current = setTimeout(callback, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return mySetTimeout;
}
