import React, { useEffect, useState } from 'react';
import '../../styles/Board/Timer.css';
import { TIMER_PROPS } from '../../utils/BoardUtils';

const Timer = ({onTimerExpired}) => {
  const [minutes, setMinutes] = useState(TIMER_PROPS.minute);
  const [seconds, setSeconds] = useState(TIMER_PROPS.seconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(59);
      setMinutes((prevMinutes) => prevMinutes - 1);
    }

    const myTimer = setTimeout(() => {
      setSeconds((prevSec) => prevSec - 1);
    }, 1000);

    if (minutes === 0 && seconds === 0) {
      clearTimeout(myTimer);
      setExpired(true);
      onTimerExpired()
    }

    return () => clearTimeout(myTimer);
  }, [minutes, seconds]);

  return (
    <div className="timer">
      {!expired ? (
        <p>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      ) : (
        <p className="expired-text">Time Expired!</p>
      )}
    </div>
  );
}

export default Timer;
