import { useEffect } from "react";
import { useTimer, TimerResult } from "react-timer-hook";

/**
 * Hook which counts down until the next Whittle.
 *
 * @returns string containing the time until the next game.
 */
export const useNextGameTimer = () => {
  const timer = useTimer({ expiryTimestamp: getMidnight() });

  useEffect(() => {
    if (!timer.isRunning) {
      timer.restart(getMidnight());
    }
  }, [timer]);

  return getRemainingTime(timer);
};

const getMidnight = () => {
  const currentTime = new Date();

  currentTime.setHours(24, 0, 0, 0);

  return currentTime;
};

const getRemainingTime = (timer: TimerResult) => {
  const hours = timer.hours.toString().padStart(2, "0");
  const minutes = timer.minutes.toString().padStart(2, "0");
  const seconds = timer.seconds.toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
