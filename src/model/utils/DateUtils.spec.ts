import { Event } from "../enums/Event";
import { DateUtils } from "./DateUtils";

describe("DateUtils", () => {
  it("identifies an event on a given day", () => {
    // Loop through each date and check that the correct event is returned
    Object.entries(dates).forEach(([eventName, eventDates]) => {
      eventDates.forEach((eventDate) => {
        const event = DateUtils.getEvent(eventDate);

        if (eventName === Event.FIRST_DAY_OF_HANUKKAH) {
          // If Hanukkah falls on the same day as Christmas, then prioritise Christmas
          if (
            dates[Event.CHRISTMAS].find((date) =>
              DateUtils.isSameDay(date, eventDate)
            )
          ) {
            // eslint-disable-next-line jest/no-conditional-expect
            return expect(event).toBe(Event.CHRISTMAS);
          }
          // If Hanukkah falls on the same day as Christmas Eve, then prioritise Christmas Eve
          else if (
            dates[Event.CHRISTMAS_EVE].find((date) =>
              DateUtils.isSameDay(date, eventDate)
            )
          ) {
            // eslint-disable-next-line jest/no-conditional-expect
            return expect(event).toBe(Event.CHRISTMAS_EVE);
          }
        }
        if (eventName === Event.SHROVE_TUESDAY) {
          // If Shrove Tuesday falls on the same day as Chinese New Year, then prioritise Chinese New Year
          if (
            dates[Event.CHINESE_NEW_YEAR].find((date) =>
              DateUtils.isSameDay(date, eventDate)
            )
          ) {
            // eslint-disable-next-line jest/no-conditional-expect
            return expect(event).toBe(Event.CHINESE_NEW_YEAR);
          }
        }

        expect(event).toBe(eventName);
      });
    });
  });

  it("knows when New Year's Day is", () => {
    // Each valid date should return true
    dates[Event.NEW_YEARS_DAY].forEach((date) => {
      expect(DateUtils.isNewYearsDay(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isNewYearsDay(nonEventDay)).toBe(false);
  });

  it("knows when the Chinese New Year is", () => {
    // Each valid date should return true
    dates[Event.CHINESE_NEW_YEAR].forEach((date) => {
      expect(DateUtils.isChineseNewYear(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isChineseNewYear(nonEventDay)).toBe(false);
  });

  it("knows when Valentine's Day is", () => {
    // Each valid date should return true
    dates[Event.VALENTINES_DAY].forEach((date) => {
      expect(DateUtils.isValentinesDay(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isValentinesDay(nonEventDay)).toBe(false);
  });

  it("knows when Shrove Tuesday is", () => {
    // Each valid date should return true
    dates[Event.SHROVE_TUESDAY].forEach((date) => {
      expect(DateUtils.isShroveTuesday(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isShroveTuesday(nonEventDay)).toBe(false);
  });

  it("knows when St. Patrick's Day is", () => {
    // Each valid date should return true
    dates[Event.ST_PATRICKS_DAY].forEach((date) => {
      expect(DateUtils.isStPatricksDay(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isStPatricksDay(nonEventDay)).toBe(false);
  });

  it("knows when April Fools' Day is", () => {
    // Each valid date should return true
    dates[Event.APRIL_FOOLS].forEach((date) => {
      expect(DateUtils.isAprilFools(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isAprilFools(nonEventDay)).toBe(false);
  });

  it("knows when Good Friday is", () => {
    // Each valid date should return true
    dates[Event.GOOD_FRIDAY].forEach((date) => {
      expect(DateUtils.isGoodFriday(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isGoodFriday(nonEventDay)).toBe(false);
  });

  it("knows when Easter Sunday is", () => {
    // Each valid date should return true
    dates[Event.EASTER_SUNDAY].forEach((date) => {
      expect(DateUtils.isEasterSunday(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isEasterSunday(nonEventDay)).toBe(false);
  });

  it("knows when Star Wars Day is", () => {
    // Each valid date should return true
    dates[Event.STAR_WARS_DAY].forEach((date) => {
      expect(DateUtils.isStarWarsDay(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isStarWarsDay(nonEventDay)).toBe(false);
  });

  it("knows when the first day of pride month is", () => {
    // Each valid date should return true
    dates[Event.FIRST_DAY_OF_PRIDE_MONTH].forEach((date) => {
      expect(DateUtils.isFirstDayOfPrideMonth(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isFirstDayOfPrideMonth(nonEventDay)).toBe(false);
  });

  it("knows when Halloween is", () => {
    // Each valid date should return true
    dates[Event.HALLOWEEN].forEach((date) => {
      expect(DateUtils.isHalloween(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isHalloween(nonEventDay)).toBe(false);
  });

  it("knows when the first day of Hanukkah is", () => {
    // Each valid date should return true
    dates[Event.FIRST_DAY_OF_HANUKKAH].forEach((date) => {
      expect(DateUtils.isFirstDayOfHanukkah(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isFirstDayOfHanukkah(nonEventDay)).toBe(false);
  });

  it("knows when Christmas Eve is", () => {
    // Each valid date should return true
    dates[Event.CHRISTMAS_EVE].forEach((date) => {
      expect(DateUtils.isChristmasEve(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isChristmasEve(nonEventDay)).toBe(false);
  });

  it("knows when Christmas Day is", () => {
    // Each valid date should return true
    dates[Event.CHRISTMAS].forEach((date) => {
      expect(DateUtils.isChristmas(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isChristmas(nonEventDay)).toBe(false);
  });

  it("knows when New Year's Eve is", () => {
    // Each valid date should return true
    dates[Event.NEW_YEARS_EVE].forEach((date) => {
      expect(DateUtils.isNewYearsEve(date)).toBe(true);
    });

    // Non event day should return false
    expect(DateUtils.isNewYearsEve(nonEventDay)).toBe(false);
  });

  it("knows whether two dates fall on the same day", () => {
    expect(DateUtils.isSameDay(today, alsoToday)).toBe(true);
    expect(DateUtils.isSameDay(today, tomorrow)).toBe(false);
  });

  it("can calculate the number of dates between two dates", () => {
    expect(DateUtils.getDaysBetween(today, alsoToday)).toBe(0);
    expect(DateUtils.getDaysBetween(today, tomorrow)).toBe(1);
    expect(DateUtils.getDaysBetween(lateToday, tomorrow)).toBe(1);
    expect(DateUtils.getDaysBetween(today, lateTomorrow)).toBe(1);
    expect(DateUtils.getDaysBetween(today, tenDaysTime)).toBe(10);
  });
});

// The dates of each event for the next six years
const dates: Record<Event, Date[]> = {
  "New Year's Day": [
    new Date(2022, 0, 1),
    new Date(2023, 0, 1),
    new Date(2024, 0, 1),
    new Date(2025, 0, 1),
    new Date(2026, 0, 1),
    new Date(2027, 0, 1),
  ],
  "Chinese New Year": [
    new Date(2022, 1, 1),
    new Date(2023, 0, 22),
    new Date(2024, 1, 10),
    new Date(2025, 0, 29),
    new Date(2026, 1, 17),
    new Date(2027, 1, 7),
  ],
  "Valentine's Day": [
    new Date(2022, 1, 14),
    new Date(2023, 1, 14),
    new Date(2024, 1, 14),
    new Date(2025, 1, 14),
    new Date(2026, 1, 14),
    new Date(2027, 1, 14),
  ],
  "Shrove Tuesday": [
    new Date(2022, 2, 1),
    new Date(2023, 1, 21),
    new Date(2024, 1, 13),
    new Date(2025, 2, 4),
    new Date(2026, 1, 17),
    new Date(2027, 1, 9),
  ],
  "St. Patrick's Day": [
    new Date(2022, 2, 17),
    new Date(2023, 2, 17),
    new Date(2024, 2, 17),
    new Date(2025, 2, 17),
    new Date(2026, 2, 17),
    new Date(2027, 2, 17),
  ],
  "April Fools' Day": [
    new Date(2022, 3, 1),
    new Date(2023, 3, 1),
    new Date(2024, 3, 1),
    new Date(2025, 3, 1),
    new Date(2026, 3, 1),
    new Date(2027, 3, 1),
  ],
  "Good Friday": [
    new Date(2022, 3, 15),
    new Date(2023, 3, 7),
    new Date(2024, 2, 29),
    new Date(2025, 3, 18),
    new Date(2026, 3, 3),
    new Date(2027, 2, 26),
  ],
  "Easter Sunday": [
    new Date(2022, 3, 17),
    new Date(2023, 3, 9),
    new Date(2024, 2, 31),
    new Date(2025, 3, 20),
    new Date(2026, 3, 5),
    new Date(2027, 2, 28),
  ],
  "Star Wars Day": [
    new Date(2022, 4, 4),
    new Date(2023, 4, 4),
    new Date(2024, 4, 4),
    new Date(2025, 4, 4),
    new Date(2026, 4, 4),
    new Date(2027, 4, 4),
  ],
  "First Day of Pride Month": [
    new Date(2022, 5, 1),
    new Date(2023, 5, 1),
    new Date(2024, 5, 1),
    new Date(2025, 5, 1),
    new Date(2026, 5, 1),
    new Date(2027, 5, 1),
  ],
  "First Day of Hanukkah": [
    new Date(2022, 11, 18),
    new Date(2023, 11, 7),
    new Date(2024, 11, 25),
    new Date(2025, 11, 14),
    new Date(2026, 11, 4),
    new Date(2027, 11, 24),
  ],
  Halloween: [
    new Date(2022, 9, 31),
    new Date(2023, 9, 31),
    new Date(2024, 9, 31),
    new Date(2025, 9, 31),
    new Date(2026, 9, 31),
    new Date(2027, 9, 31),
  ],
  "Christmas Eve": [
    new Date(2022, 11, 24),
    new Date(2023, 11, 24),
    new Date(2024, 11, 24),
    new Date(2025, 11, 24),
    new Date(2026, 11, 24),
    new Date(2027, 11, 24),
  ],
  Christmas: [
    new Date(2022, 11, 25),
    new Date(2023, 11, 25),
    new Date(2024, 11, 25),
    new Date(2025, 11, 25),
    new Date(2026, 11, 25),
    new Date(2027, 11, 25),
  ],
  "New Year's Eve": [
    new Date(2022, 11, 31),
    new Date(2023, 11, 31),
    new Date(2024, 11, 31),
    new Date(2025, 11, 31),
    new Date(2026, 11, 31),
    new Date(2027, 11, 31),
  ],
};

// A day which has no event
const nonEventDay = new Date(2002, 2, 20);

// Other dates
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const alsoToday = new Date(today.getTime());
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const tenDaysTime = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
const lateToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  23,
  59,
  59
);
const lateTomorrow = new Date(
  tomorrow.getFullYear(),
  tomorrow.getMonth(),
  tomorrow.getDate(),
  23,
  59,
  59
);
