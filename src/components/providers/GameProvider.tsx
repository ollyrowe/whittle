import React, { createRef, useContext, useState } from "react";
import CanvasConfetti from "react-canvas-confetti";
import {
  arraySwap,
  NewIndexGetter,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  DndContext,
  CollisionDetection,
  UniqueIdentifier,
  DragStartEvent,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import ThemeProvider from "./ThemeProvider";
import { defaultSettings } from "../../hooks/useSettings";
import { createLightTheme } from "../../misc/theme";
import { Game } from "../../hooks/useGame";
import { Board } from "../../model/Board";
import { Rack } from "../../model/Rack";

interface Props {
  game: Game;
  children?: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ game, children }) => {
  const { board, rack, settings, onSwapTiles, confetti } = game;

  const tiles = [...board.getTiles(), ...rack.getTiles()];

  const tileIDs = tiles.map((tile) => tile.getID());

  // The ID of the currently active tile which is being dragged
  const [activeTileId, setActiveTileId] = useState<UniqueIdentifier>();

  // Drag and drop sensor to enable mouse control
  const mouseSensor = useSensor(MouseSensor);
  // Drag and drop sensor to enable touch control
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  /**
   * Function which updates the currently active tile upon the
   * initiation of a drag event.
   *
   * @param event - the drag start event.
   */
  const onDragStart = (event: DragStartEvent) => {
    setActiveTileId(event.active.id);
  };

  /**
   * Function which handles the swapping of tiles upon completion
   * of a drag event.
   *
   * @param event - the drag end event.
   */
  const onDragEnd = (event: DragEndEvent) => {
    // The tile being dragged (active) and the tile to be swapped (over)
    const { active, over } = event;

    if (over) {
      const activeTile = tiles.find((tile) => tile.getID() === active.id)!;

      const overTile = tiles.find((letter) => letter.getID() === over.id)!;

      // Whether the tile to be swapped has been hovered over for the required period of time
      const hasOverTimerLapsed = over.data.current?.hasOverTimerLapsed;

      // If the tile doesn't have a letter or the over timer has lapsed
      if (!overTile.hasLetter() || hasOverTimerLapsed) {
        onSwapTiles(activeTile, overTile);
      }
    }
  };

  /**
   * Custom collision detection algorithm which extends the basic behaviour of
   * the rect intersection algorithm built into dnd-kit.
   *
   * This implementation adds the currently active tile as a collision when no
   * other collisions are detected. The effect of this means that tiles can be
   * dragged outside of the bounds of the board and rack components.
   *
   * @param args - the collision detection arguments.
   * @returns any identified collisions.
   */
  const collisionDetection: CollisionDetection = (args) => {
    const collisions = rectIntersection(args);

    if (collisions.length === 0 && activeTileId) {
      collisions.push({ id: activeTileId });
    }

    return collisions;
  };

  return (
    <>
      <GameContext.Provider value={game}>
        <ThemeProvider theme={settings.theme}>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetection={collisionDetection}
            autoScroll={false}
          >
            <SortableContext items={tileIDs} strategy={rectSwappingStrategy}>
              {children}
            </SortableContext>
          </DndContext>
        </ThemeProvider>
      </GameContext.Provider>
      <CanvasConfetti {...confetti.canvasProps} />
    </>
  );
};

export default GameProvider;

/**
 * Gets the new index of a tile based on a swap.
 */
export const getNewIndex: NewIndexGetter = ({
  id,
  items,
  activeIndex,
  overIndex,
}) => {
  return arraySwap(items, activeIndex, overIndex).indexOf(id);
};

export const GameContext = React.createContext<Game>({
  number: 0,
  date: new Date(),
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  displayHowToPlay: false,
  openHowToPlay: () => {},
  closeHowToPlay: () => {},
  reset: () => {},
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleEasyMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
  },
  completedGames: [],
  boardRef: createRef(),
  confetti: {
    canvasProps: {
      refConfetti: () => {},
      style: {},
    },
    fire: () => {},
  },
});

export const useGameContext = () => {
  return useContext(GameContext);
};
