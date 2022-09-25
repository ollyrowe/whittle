import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

/**
 * Hook which returns true once the provided condition has been true for
 * the specified time period.
 *
 * @param condition - the condition to observe.
 * @param period - the number of milliseconds required for the condition to be true for.
 * @returns true, once the condition has been true for the specified time period.
 */
export const useConditionTimer = (condition: boolean, period: number) => {
  // Whether the specified time period has lapsed
  const [hasTimeLapsed, setHasTimeLapsed] = useState(false);

  const onExpire = () => {
    setHasTimeLapsed(true);
  };

  // Create the timer instance with a default expiry timestamp
  const timer = useTimer({ expiryTimestamp: new Date(), onExpire });

  /**
   * Effect which is invoked upon change to the condition state.
   */
  useEffect(() => {
    if (condition) {
      // If the timer hasn't yet been started
      if (!timer.isRunning) {
        // Restart the timer, which will expire after the threshold time has lapsed
        timer.restart(getTimeInFuture(period));
      }
    } else {
      // Stop the timer, condition is no-longer true
      timer.pause();
      // Reset the hasTimeLapsed state
      setHasTimeLapsed(false);
    }
  }, [condition, timer, period]);

  return hasTimeLapsed;
};

/**
 * Gets the date and time a given number of milliseconds in the future.
 *
 * @param milliseconds - the number of milliseconds in the future.
 * @returns the future date and time.
 */
const getTimeInFuture = (milliseconds: number) => {
  const currentTime = new Date();

  currentTime.setMilliseconds(currentTime.getMilliseconds() + milliseconds);

  return currentTime;
};
