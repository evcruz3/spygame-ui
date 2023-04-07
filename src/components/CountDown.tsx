import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown = (props: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>((props.targetDate.getTime() - new Date().getTime()) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((props.targetDate.getTime() - new Date().getTime()) / 1000);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } 
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const seconds = Math.floor((timeLeft) % 60).toString().padStart(2, "0");
  const minutes = Math.floor((timeLeft / 60) % 60).toString().padStart(2, "0");
  const display = `${minutes}:${seconds}`

  return <div>{display}</div>;
};

export default Countdown;