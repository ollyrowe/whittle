import React from "react";
import styled from "styled-components";
import DayCircle, { CircleIcon, CircleType } from "./DayCircle";
import { CompletedGame } from "../../../model/game/GameLoader";
import { Day } from "../../../model/enums/Day";
import { DateUtils } from "../../../model/utils/DateUtils";

interface Props {
  /** The completed games which form part of the current streak */
  currentStreak: CompletedGame[];
  /** All games that have been completed by the user */
  completedGames: CompletedGame[];
}

const StreakCalendar: React.FC<Props> = ({ currentStreak, completedGames }) => {
  // Get the dates of the days within this week
  const thisWeek = getThisWeek();

  const getDayCircle = (dayOfTheWeek: DayOfTheWeek, key: number) => {
    // Whether this day forms part of the current streak
    const formsStreak = !!currentStreak.find((game) =>
      DateUtils.isSameDay(game.date, dayOfTheWeek.date)
    );

    const type = getCircleType(dayOfTheWeek, completedGames, formsStreak);

    const icon = getCircleIcon(dayOfTheWeek, completedGames);

    return (
      <DayCircle key={key} type={type} icon={icon} formsStreak={formsStreak} />
    );
  };

  return (
    <Container>
      <Row>
        <DayText>Su</DayText>
        <DayText>M</DayText>
        <DayText>Tu</DayText>
        <DayText>W</DayText>
        <DayText>Th</DayText>
        <DayText>F</DayText>
        <DayText>Sa</DayText>
      </Row>
      <Row>{thisWeek.map(getDayCircle)}</Row>
    </Container>
  );
};

export default StreakCalendar;

type DayOfTheWeek = { day: Day; date: Date };

// The days in the week (starting from last Sunday)
const days = [
  Day.SUNDAY,
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
];

/**
 * Gets the days and dates within the current week.
 *
 * Note that the week starts from the Sunday of the previous week.
 */
const getThisWeek = () => {
  return days.map((day) => ({ day, date: getDayOfWeek(day) }));
};

/**
 * Gets the date of a given day of this week.
 */
const getDayOfWeek = (day: Day) => {
  const today = new Date();

  // The number of days between today and the specified day
  const dayDifference = day - today.getDay();

  today.setDate(today.getDate() + dayDifference);

  return today;
};

/**
 * Given a day of the week, this function determines the type
 * of the associated day circle to be rendered.
 *
 * By default, days which do not form part of the streak should be
 * rendered as a complete circle. However, days which form part of
 * the user's streak should form a continuous line comprising of a
 * left-end node and right-end node with a variable number of
 * middle nodes connecting the two.
 */
const getCircleType = (
  dayOfTheWeek: DayOfTheWeek,
  completedGames: CompletedGame[],
  formsStreak: boolean
): CircleType => {
  if (!formsStreak) {
    return "complete";
  }

  const { day, date } = dayOfTheWeek;

  const previousDay = DateUtils.getPreviousDay(date);

  const previousCompletedGame = completedGames.find((game) =>
    DateUtils.isSameDay(game.date, previousDay)
  );

  const nextDay = DateUtils.getNextDay(date);

  const nextCompletedGame = completedGames.find((game) =>
    DateUtils.isSameDay(game.date, nextDay)
  );

  const hasLeftStreakDay = previousCompletedGame && day !== Day.SUNDAY;

  if (!hasLeftStreakDay && !nextCompletedGame) {
    return "complete";
  }

  if (!hasLeftStreakDay) {
    return "left-end";
  }

  if (!nextCompletedGame) {
    return "right-end";
  }

  return "middle";
};

/**
 * Given a day of the week, this function determines the icon
 * of the associated day circle to be rendered.
 */
const getCircleIcon = (
  dayOfTheWeek: DayOfTheWeek,
  completedGames: CompletedGame[]
): CircleIcon | undefined => {
  const { date } = dayOfTheWeek;

  const today = new Date();

  const isFuture = date.getTime() > today.getTime();

  if (!isFuture) {
    // Whether there is a completed game for the day
    const hasCompletedGame = !!completedGames.find((game) =>
      DateUtils.isSameDay(game.date, date)
    );

    if (hasCompletedGame) {
      return "tick";
    }

    const isToday = DateUtils.isSameDay(date, today);

    if (isToday) {
      return "dot";
    }

    return "cross";
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
`;

const DayText = styled.div`
  font-size: 15px;
  width: 35px;
  height: 30px;
`;
