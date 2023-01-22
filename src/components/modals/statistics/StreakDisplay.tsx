import React from "react";
import styled from "styled-components";
import StreakNumber from "./StreakNumber";
import StreakCalendar from "./StreakCalendar";
import { useStreakContext } from "../../providers/StreakProvider";
import { useGameContext } from "../../providers/GameProvider";

const StreakDisplay: React.FC = () => {
  // Extract game state
  const { completedGames } = useGameContext();

  // Extract streak statistics
  const { currentStreak, hasCompletedTodaysGame } = useStreakContext();

  return (
    <Container data-testid="streak-display">
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StreakText = styled.div`
  color: ${(props) => props.theme.palette.orange.default};
  font-weight: 600;
  font-size: 27px;
  margin-top: -10px;
  margin-bottom: 8px;
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
