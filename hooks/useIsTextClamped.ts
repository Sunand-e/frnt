import { useState, useLayoutEffect, useRef, useCallback } from 'react';

const useIsTextClamped = (ref) => {
  const [isClamped, setIsClamped] = useState(false);

  const checkIfClamped = useCallback(() => {
    if (ref.current) {
      const currentIsClamped = ref.current.scrollHeight > ref.current.clientHeight;
      setIsClamped(currentIsClamped);
    }
  }, [ref]);

  useLayoutEffect(() => {
    checkIfClamped();
    const resizeObserver = new ResizeObserver(checkIfClamped);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [checkIfClamped]);

  return isClamped;
};

export default useIsTextClamped;