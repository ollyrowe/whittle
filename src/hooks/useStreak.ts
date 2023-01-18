import { useMemo } from "react";
import { useGameContext } from "../components/providers/GameProvider";
import { CompletedGame } from "../model/game/GameLoader";
import { DateUtils } from "../model/utils/DateUtils";

/**
 * Hook which determines the user's current game streak.
 */
export const useStreak = (): StreakStatistics => {
  const { completedGames, date } = useGameContext();

  // Whether the user has completed today's game
  const hasCompletedTodaysGame = useMemo(
    () => !!completedGames.find((game) => DateUtils.isSameDay(game.date, date)),
    [completedGames, date]
  );

  // The completed games which make up the current streak
  const currentStreak = useMemo(
    () => getCurrentStreak(completedGames),
    [completedGames]
  );

  return {
    currentStreak,
    hasCompletedTodaysGame,
    completedGames,
  };
};

export interface StreakStatistics {
  /** The games which form the user's current streak */
  currentStreak: CompletedGame[];
  /** All games that have been completed by the user */
  completedGames: CompletedGame[];
  /** Whether the user has completed today's game */
  hasCompletedTodaysGame: boolean;
}

/**
 * Given all of the games that the user has ever completed,
 * this function determines the user's current streak.
 */
const getCurrentStreak = (completedGames: CompletedGame[]) => {
  // The games which form the streak
  const games = [];

  const today = new Date();

  const todaysGame = completedGames.find((game) =>
    DateUtils.isSameDay(game.date, today)
  );

  if (todaysGame) {
    games.push(todaysGame);
  }

  const sortedCompletedGames = completedGames.sort(
    (first, second) => second.date.getTime() - first.date.getTime()
  );

  let date = DateUtils.getPreviousDay(today);

  for (const game of sortedCompletedGames) {
    // Ignore today's game as that's already been accounted for
    if (game === todaysGame) {
      continue;
    }

    if (DateUtils.isSameDay(game.date, date)) {
      games.push(game);
    } else {
      break;
    }

    // Set the date to the previous day
    date.setDate(date.getDate() - 1);
  }

  return games;
};
