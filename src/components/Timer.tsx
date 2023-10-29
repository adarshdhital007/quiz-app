import { useEffect, useState } from "react";

interface QuestionTimerProps {
  timeout: number;
  onTimeOut: () => void;
}

export default function QuestionTimer({
  timeout,
  onTimeOut,
}: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeOut(); // Call onTimeOut when the timer expires
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime <= 0) {
        onTimeOut();
      } else {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, onTimeOut]);

  const getProgressBarColor = () => {
    //added percentage colors i.e below 25%  and others
    if (remainingTime < 2500) {
      return "#FF0000";
    } else if (remainingTime < 6500) {
      return "#ffc107";
    }
    return "#0bbd0b";
  };

  const progressBarStyle = {
    background: getProgressBarColor(),
    width: `${(remainingTime / timeout) * 100}%`,
  };

  return (
    <div className="progressbar-container">
      <div className="progressbar" style={progressBarStyle}></div>
    </div>
  );
}
