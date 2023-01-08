import { useCallback } from "react";
import { useStopwatch } from "react-timer-hook";
import { getTimeInFuture } from "./useConditionTimer";
import { useDocumentEventListener } from "./useDocumentEventListener";

/**
 * Hook which returns a timer.
 *
 * @param startTime - the initial time lapsed value.
 * @returns the timer state and controls.
 */
export const useTimer = (startTime = 0): Timer => {
  const stopwatch = useStopwatch({
    offsetTimestamp: getTimeInFuture(startTime * 1000),
    autoStart: false,
  });

  const { seconds, minutes, hours, isRunning, pause } = stopwatch;

  const start = useCallback(() => {
    if (!isRunning) {
      stopwatch.start();
    }
  }, [isRunning, stopwatch]);

  const reset = () => {
    stopwatch.reset(new Date(), false);
  };

  /**
   * If the user navigates away from the page, pause the timer.
   */
  useDocumentEventListener("visibilitychange", (e) => {
    if (document.visibilityState === "visible") {
      start();
    } else {
      pause();
    }
  });

  const text = getTimeString(hours, minutes, seconds);

  const timeLapsed = seconds + minutes * 60 + hours * 60 * 60;

  return { text, timeLapsed, start, pause, reset };
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
  reset: () => void;
}
