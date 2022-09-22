import React from "react";
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
import { Game } from "../../hooks/useGame";
import { Board } from "../../model/Board";
import { Rack } from "../../model/Rack";

interface Props {
  game: Game;
  children?: React.ReactNode;
}

const GameProvider: React.FC<Props> = ({ game, children }) => {
  const { board, rack, onSwapTiles } = game;

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

      onSwapTiles(activeTile, overTile);
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
    <GameContext.Provider value={{ ...game, getNewIndex }}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <SortableContext items={tileIDs} strategy={rectSwappingStrategy}>
          {children}
        </SortableContext>
      </DndContext>
    </GameContext.Provider>
  );
};

export default GameProvider;

interface GameContextProps extends Game {
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
});
