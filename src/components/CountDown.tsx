import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const timeUntilTarget = targetDate.getTime() - new Date().getTime();
      if (timeUntilTarget < 0) {
        clearInterval(interval);
        setTimeLeft('0:0:0:0');
      } else {
        const seconds = Math.floor((timeUntilTarget / 1000) % 60).toString().padStart(2, "0");
        const minutes = Math.floor((timeUntilTarget / 1000 / 60) % 60).toString().padStart(2, "0");
        // const hours = Math.floor((timeUntilTarget / 1000 / 60 / 60) % 24).toString().padStart(2, "0");
        // const days = Math.floor(timeUntilTarget / 1000 / 60 / 60 / 24).toString().padStart(2, "0");
        setTimeLeft(`${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <div>{timeLeft}</div>;
};

export default Countdown;