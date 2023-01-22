import React, { useContext, useMemo } from "react";
import { useGameContext } from "../../components/providers/GameProvider";
import { CompletedGame } from "../../model/game/GameLoader";
import { DateUtils } from "../../model/utils/DateUtils";

interface Props {
  children?: React.ReactNode;
}

const StreakProvider: React.FC<Props> = ({ children }) => {
  // Extract game state
  const { completedGames, date } = useGameContext();

  // The completed games which make up the current streak
  const currentStreak = useMemo(
    () => getCurrentStreak(completedGames),
    [completedGames]
  );

  // Whether the user has completed today's game
  const hasCompletedTodaysGame = useMemo(
    () => !!completedGames.find((game) => DateUtils.isSameDay(game.date, date)),
    [completedGames, date]
  );

  const streakStatistics: StreakStatistics = {
    currentStreak,
    hasCompletedTodaysGame,
  };

  return (
    <StreakContext.Provider value={streakStatistics}>
      {children}
    </StreakContext.Provider>
  );
};

export default StreakProvider;

export const StreakContext = React.createContext<StreakStatistics>({
  currentStreak: [],
  hasCompletedTodaysGame: false,
});

export const useStreakContext = () => {
  return useContext(StreakContext);
};

export interface StreakStatistics {
  /** The games which form the user's current streak */
  currentStreak: CompletedGame[];
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
