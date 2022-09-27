import React from "react";
import CanvasConfetti from "react-canvas-confetti";
import {
  arraySwap,
  NewIndexGetter,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
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

  // Drag and drop sensor to enable mouse control
  const mouseSensor = useSensor(MouseSensor);
  // Drag and drop sensor to enable touch control
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

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
   * Gets the new index of a tile based on a swap.
   */
  const getNewIndex: NewIndexGetter = ({
    id,
    items,
    activeIndex,
    overIndex,
  }) => {
    return arraySwap(items, activeIndex, overIndex).indexOf(id);
  };

  return (
    <>
      <GameContext.Provider value={{ ...game, getNewIndex }}>
        <ThemeProvider theme={settings.theme}>
          <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
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

export interface GameContextProps extends Game {
  /** Gets the new index of a tile based on a swap */
  getNewIndex: NewIndexGetter;
}

export const GameContext = React.createContext<GameContextProps>({
  board: new Board(),
  rack: new Rack([]),
  onSwapTiles: () => {},
  displayStats: false,
  openStats: () => {},
  closeStats: () => {},
  getNewIndex: () => -1,
  settings: {
    ...defaultSettings,
    theme: createLightTheme(false),
    toggleEasyMode: () => {},
    toggleTheme: () => {},
    toggleHighContrastMode: () => {},
    toggleSoundFx: () => {},
  },
  confetti: {
    canvasProps: {
      refConfetti: () => {},
      style: {},
    },
    fire: () => {},
  },
});
