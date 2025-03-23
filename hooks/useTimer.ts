import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const [canSend, setCanSend] = useState(true);

  useEffect(() => {
    if (timer === 0) {
      setCanSend(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [timer]);

  const resetTimer = () => {
    setTimer(initialTime);
    setCanSend(false);
  };

  return { timer, canSend, resetTimer };
};

export default useTimer;
