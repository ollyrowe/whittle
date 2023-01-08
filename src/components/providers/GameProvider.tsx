import React, { useContext, useRef } from "react";
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
import { Tile } from "../../model/Tile";

interface Props {
  game: Game;
  children?: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ game, children }) => {
  const { board, rack, settings, onSwapTiles, setOutlineRack, confetti } = game;

  const tiles = [...board.getTiles(), ...rack.getTiles()];

  const tileIDs = tiles.map((tile) => tile.getID());

  // The currently active tile which is being dragged
  const activeTile = useRef<Tile>();

  // The tile currently being hovered over
  const overTile = useRef<Tile>();

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
    // Update the currently active tile
    activeTile.current = tiles.find((tile) => tile.getID() === event.active.id);
  };

  /**
   * Function which handles drag move events, hiding and showing
   * the rack outline accordingly.
   */
  const onDragMove = () => {
    // If a tile from the board is currently being dragged
    if (activeTile.current?.getLocation().name === "board") {
      // If there is a tile being hovered over
      if (overTile.current) {
        // If the tile being hovered over is on the board
        if (overTile.current.getLocation().name === "board") {
          setOutlineRack(false);
        } else {
          setOutlineRack(true);
        }
      } else {
        // Display the outline when a tile isn't being hovered over
        setOutlineRack(true);
      }
    }
  };

  /**
   * Function which handles the swapping of tiles upon completion
   * of a drag event.
   *
   * @param event - the drag end event.
   */
  const onDragEnd = (event: DragEndEvent) => {
    // Update the currently active tile
    activeTile.current = undefined;

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

    // Hide the rack outline
    setOutlineRack(false);
  };

  /**
   * Custom collision detection algorithm which extends the basic behaviour of
   * the rect intersection algorithm built into dnd-kit.
   *
   * This implementation adds the currently active tile as a collision when no
   * other collisions are detected. The effect of this means that tiles can be
   * dragged outside of the bounds of the board and rack components.
   *
   * This function also updates the tile which is currently being hovered over.
   *
   * @param args - the collision detection arguments.
   * @returns any identified collisions.
   */
  const collisionDetection: CollisionDetection = (args) => {
    const collisions = rectIntersection(args);

    if (collisions.length === 0 && activeTile.current) {
      collisions.push({ id: activeTile.current.getID() });
      // As there isn't actually a collision, reset the over tile
      overTile.current = undefined;
    } else {
      // The ID of the first collision tile
      const firstCollisionTileId = collisions[0].id;

      // If the collision tile differs from the current over tile
      if (overTile.current?.getID() !== firstCollisionTileId) {
        // Update the current over tile
        overTile.current = tiles.find(
          (tile) => tile.getID() === firstCollisionTileId
        );
      }
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
            onDragMove={onDragMove}
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
  answer: { letters: "", theme: "", words: [] },
  outlineRack: false,
  setOutlineRack: () => {},
  onSwapTiles: () => {},
  onReturnTileToRack: () => {},
  reset: () => {},
  timer: {
    text: "",
    timeLapsed: 0,
    start: () => {},
    pause: () => {},
    reset: () => {},
  },
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleHardMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
    toggleHints: () => {},
  },
  completedGames: [],
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
