import React, { useMemo } from "react";
import styled from "styled-components";
import StreakNumber from "./StreakNumber";
import StreakCalendar from "./StreakCalendar";
import { useGameContext } from "../../providers/GameProvider";
import { CompletedGame } from "../../../model/game/GameLoader";
import { DateUtils } from "../../../model/utils/DateUtils";

const StreakDisplay: React.FC = () => {
  // All games completed by the user
  const { completedGames } = useGameContext();

  // Whether the user has completed today's game
  const hasCompletedTodaysGame = useMemo(() => {
    const today = new Date();

    return !!completedGames.find((game) =>
      DateUtils.isSameDay(game.date, today)
    );
  }, [completedGames]);

  // The completed games which make up the current streak
  const currentStreak = useMemo(
    () => getCurrentStreak(completedGames),
    [completedGames]
  );

  return (
    <Container>
      {currentStreak.length > 0 ? (
        <>
          <StreakNumber
            number={currentStreak.length}
            disabled={!hasCompletedTodaysGame}
          />
          {hasCompletedTodaysGame ? (
            <StreakText>day streak!</StreakText>
          ) : (
            <ContinueStreakText>
              Complete today's game to continue your streak!
            </ContinueStreakText>
          )}
        </>
      ) : (
        <NoStreakText>
          {completedGames.length === 0
            ? "Complete your first game to start a streak!"
            : "Complete a game to start a streak!"}
        </NoStreakText>
      )}
      <StreakCalendar
        currentStreak={currentStreak}
        completedGames={completedGames}
      />
    </Container>
  );
};

export default StreakDisplay;

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StreakText = styled.div`
  color: ${(props) => props.theme.palette.orange.default};
  font-weight: 600;
  font-size: 28px;
  margin-top: -8px;
  margin-bottom: 12px;
`;

const ContinueStreakText = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  max-width: 262px;
`;

const NoStreakText = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 262px;
`;
