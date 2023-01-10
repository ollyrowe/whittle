import { useCallback, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { getTimeInFuture } from "./useConditionTimer";
import { useWindowEventListener } from "./useWindowEventListener";

/**
 * Hook which returns a timer.
 *
 * @param startTime - the initial time lapsed value.
 * @param isStopped - the initial stopped state.
 * @returns the timer state and controls.
 */
export const useTimer = (startTime = 0, isStopped = false): Timer => {
  const stopwatch = useStopwatch({
    offsetTimestamp: getTimeInFuture(startTime * 1000),
    autoStart: false,
  });

  const [stopped, setStopped] = useState(isStopped);

  const { seconds, minutes, hours, isRunning, pause } = stopwatch;

  const start = useCallback(() => {
    if (!isRunning) {
      stopwatch.start();
    }
  }, [isRunning, stopwatch]);

  const reset = () => {
    setStopped(false);

    stopwatch.reset(new Date(), false);
  };

  const stop = () => {
    setStopped(true);

    pause();
  };

  /**
   * If the user navigates away from the page, pause the timer.
   */
  useWindowEventListener("blur", () => {
    if (!stopped) {
      pause();
    }
  });

  /**
   * If the user navigates back to the page, start the timer.
   */
  useWindowEventListener("focus", () => {
    if (!stopped) {
      start();
    }
  });

  const text = getTimeString(hours, minutes, seconds);

  const timeLapsed = seconds + minutes * 60 + hours * 60 * 60;

  return { text, timeLapsed, start, pause, stop, reset };
};

const getTimeString = (hours: number, minutes: number, seconds: number) => {
  const totalMinutes = minutes + hours * 60;

  const minutesString = totalMinutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");

  return `${minutesString}:${secondsString}`;
};

export interface Timer {
  /** Textual representation of the lapsed time */
  text: string;
  /** The total number of seconds lapsed */
  timeLapsed: number;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
}
