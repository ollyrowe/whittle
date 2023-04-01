import { Event } from "../enums/Event";

/**
 * Date Utils.
 *
 * Utility which supports the identification of various event days
 * within the year.
 *
 * Note that the methods contained within this class use the user's
 * local date and time settings.
 */
export class DateUtils {
  /** The number of milliseconds in a day */
  private static MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  /**
   * Gets the event, if any, which falls on the specified date.
   *
   * @param date - the date to identify the event for.
   * @returns the event on the day, if there is one.
   */
  public static getEvent(date: Date) {
    if (DateUtils.isNewYearsDay(date)) {
      return Event.NEW_YEARS_DAY;
    }

    if (DateUtils.isChineseNewYear(date)) {
      return Event.CHINESE_NEW_YEAR;
    }

    if (DateUtils.isValentinesDay(date)) {
      return Event.VALENTINES_DAY;
    }

    if (DateUtils.isShroveTuesday(date)) {
      return Event.SHROVE_TUESDAY;
    }

    if (DateUtils.isStPatricksDay(date)) {
      return Event.ST_PATRICKS_DAY;
    }

    if (DateUtils.isAprilFools(date)) {
      return Event.APRIL_FOOLS;
    }

    if (DateUtils.isGoodFriday(date)) {
      return Event.GOOD_FRIDAY;
    }

    if (DateUtils.isEasterSunday(date)) {
      return Event.EASTER_SUNDAY;
    }

    if (DateUtils.isFirstDayOfPrideMonth(date)) {
      return Event.FIRST_DAY_OF_PRIDE_MONTH;
    }

    if (DateUtils.isHalloween(date)) {
      return Event.HALLOWEEN;
    }

    if (DateUtils.isChristmasEve(date)) {
      return Event.CHRISTMAS_EVE;
    }

    if (DateUtils.isChristmas(date)) {
      return Event.CHRISTMAS;
    }

    if (DateUtils.isFirstDayOfHanukkah(date)) {
      return Event.FIRST_DAY_OF_HANUKKAH;
    }

    if (DateUtils.isNewYearsEve(date)) {
      return Event.NEW_YEARS_EVE;
    }
  }

  public static isNewYearsDay(date: Date) {
    return date.getDate() === 1 && date.getMonth() === 0;
  }

  public static isChineseNewYear(date: Date) {
    const chineseDate = DateUtils.getChineseDate(date);

    return chineseDate.day === 1 && chineseDate.month === 1;
  }

  public static isValentinesDay(date: Date) {
    return date.getDate() === 14 && date.getMonth() === 1;
  }

  public static isShroveTuesday(date: Date) {
    const easter = DateUtils.getEaster(date);

    const shroveTuesday = new Date(easter);

    shroveTuesday.setDate(shroveTuesday.getDate() - 47);

    return (
      date.getDate() === shroveTuesday.getDate() &&
      date.getMonth() === shroveTuesday.getMonth()
    );
  }

  public static isStPatricksDay(date: Date) {
    return date.getDate() === 17 && date.getMonth() === 2;
  }

  public static isAprilFools(date: Date) {
    return date.getDate() === 1 && date.getMonth() === 3;
  }

  public static isGoodFriday(date: Date) {
    const easter = DateUtils.getEaster(date);

    return (
      date.getDate() === easter.getDate() - 2 &&
      date.getMonth() === easter.getMonth()
    );
  }

  public static isEasterSunday(date: Date) {
    const easter = DateUtils.getEaster(date);

    return (
      date.getDate() === easter.getDate() &&
      date.getMonth() === easter.getMonth()
    );
  }

  public static isFirstDayOfPrideMonth(date: Date) {
    return date.getDate() === 1 && date.getMonth() === 5;
  }

  public static isHalloween(date: Date) {
    return date.getDate() === 31 && date.getMonth() === 9;
  }

  /**
   * Hanukkah starts on the 25th day of the Hebrew month Kislev.
   *
   * As each Hebrew day starts in the evening of what we'd consider a
   * day, this method uses the 24th day instead of the 25th.
   */
  public static isFirstDayOfHanukkah(date: Date) {
    const hebrewDate = DateUtils.getHebrewDate(date);

    return hebrewDate.day === 24 && hebrewDate.month === 3;
  }

  public static isChristmasEve(date: Date) {
    return date.getDate() === 24 && date.getMonth() === 11;
  }

  public static isChristmas(date: Date) {
    return date.getDate() === 25 && date.getMonth() === 11;
  }

  public static isNewYearsEve(date: Date) {
    return date.getDate() === 31 && date.getMonth() === 11;
  }

  /**
   * Determines whether two days fall on the same day.
   *
   * @param firstDate - the first date to compare.
   * @param secondDate - the second date to compare.
   * @returns boolean indicating whether the two dates represent the same day.
   */
  public static isSameDay(firstDate: Date, secondDate: Date) {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  }

  /**
   * Identifies the total number of days between two specified dates.
   *
   * @param startDate - the start date.
   * @param endDate - the end date.
   * @returns total number of days between the two dates.
   */
  public static getDaysBetween(startDate: Date, endDate: Date) {
    // Remove all time-based information from the dates
    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    // Convert the dates to milliseconds
    const startDateInMilliseconds = start.getTime();
    const endDateInMilliseconds = end.getTime();

    const timeDifference = endDateInMilliseconds - startDateInMilliseconds;

    const dayDifference = timeDifference / DateUtils.MILLISECONDS_IN_DAY;

    // Round to account for any daylight saving offsets
    return Math.round(dayDifference);
  }

  /**
   * Gets the date of the day before a given date.
   *
   * @param date - the date to return the previous day for.
   * @returns the previous day.
   */
  public static getPreviousDay(date: Date) {
    const previousDay = new Date(date);

    previousDay.setDate(previousDay.getDate() - 1);

    return previousDay;
  }

  /**
   * Gets the date of the day after a given date.
   *
   * @param date - the date to return the next day for.
   * @returns the next day.
   */
  public static getNextDay(date: Date) {
    const nextDay = new Date(date);

    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay;
  }

  /**
   * Returns the date of easter for a given year.
   *
   * Based on the gist https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343.
   *
   * @param date - the date to obtain the current year from.
   * @returns the date of easter.
   */
  private static getEaster(date: Date) {
    const year = date.getFullYear();

    const f = Math.floor;
    // Golden Number - 1
    const G = year % 19;
    const C = f(year / 100);
    // Related to Epact
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    // Number of days from 21 March to the Paschal full moon
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
    // Weekday for the Paschal full moon
    const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
    // Number of days from 21 March to the Sunday on or before the Paschal full moon
    const L = I - J;

    const month = 3 + f((L + 40) / 44);
    const day = L + 28 - 31 * f(month / 4);

    return new Date(year, month - 1, day);
  }

  /**
   * Converts a specified date into a corresponding day and month on
   * the Hebrew calendar.
   *
   * @param date - the date to convert.
   * @returns the Hebrew day and month.
   */
  private static getHebrewDate(date: Date) {
    const day = new Intl.DateTimeFormat(HEBREW_LOCALE, {
      day: "numeric",
    }).format(date);
    const month = new Intl.DateTimeFormat(HEBREW_LOCALE, {
      month: "numeric",
    }).format(date);
    const year = new Intl.DateTimeFormat(HEBREW_LOCALE, {
      year: "numeric",
    }).format(date);

    return {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    };
  }

  /**
   * Converts a specified date into a corresponding day and month on
   * the Chinese calendar.
   *
   * @param date - the date to convert.
   * @returns the Hebrew day and month.
   */
  private static getChineseDate(date: Date) {
    const day = new Intl.DateTimeFormat(CHINESE_LOCALE, {
      day: "numeric",
    }).format(date);
    const month = new Intl.DateTimeFormat(CHINESE_LOCALE, {
      month: "numeric",
    }).format(date);
    const year = new Intl.DateTimeFormat(CHINESE_LOCALE, {
      year: "numeric",
    }).format(date);

    return {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    };
  }
}

const HEBREW_LOCALE = "en-u-ca-hebrew";
const CHINESE_LOCALE = "en-u-ca-chinese";
