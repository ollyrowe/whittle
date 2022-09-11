import React, { useMemo, useState } from "react";
import {
  arraySwap,
  NewIndexGetter,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Letter } from "../../model/Letter";
import { Tile } from "../../model/Tile";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../misc/constants";

interface Props {
  letters: Letter[];
  children?: React.ReactNode;
}

const TileProvider: React.FC<Props> = ({ letters, children }) => {
  const [tiles, setTiles] = useState(createTiles(letters));

  const boardTiles = useMemo(
    () => tiles.filter((tile) => tile.getLocation() === "board"),
    [tiles]
  );

  const rackTiles = useMemo(
    () => tiles.filter((tile) => tile.getLocation() === "rack"),
    [tiles]
  );

  const tileIDs = tiles.map((tile) => tile.getID());

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
      let updateTiles = [...tiles];

      const activeTile = updateTiles.find(
        (tile) => tile.getID() === active.id
      )!;

      const activeIndex = updateTiles.indexOf(activeTile);

      const overTile = updateTiles.find(
        (letter) => letter.getID() === over.id
      )!;

      const overIndex = updateTiles.indexOf(overTile);

      // Swap the location of the two tiles in the array
      updateTiles = arraySwap(updateTiles, activeIndex, overIndex);

      // If the two tiles are in different locations, swap them
      if (activeTile.getLocation() !== overTile.getLocation()) {
        const activeTileLocation = activeTile.getLocation();

        activeTile.setLocation(overTile.getLocation());
        overTile.setLocation(activeTileLocation);
      }

      setTiles(updateTiles);
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

  const providedContext: TileContextProps = {
    tiles: { board: boardTiles, rack: rackTiles },
    getNewIndex,
  };

  return (
    <TileContext.Provider value={providedContext}>
      <DndContext onDragEnd={onDragEnd}>
        <SortableContext items={tileIDs} strategy={rectSwappingStrategy}>
          {children}
        </SortableContext>
      </DndContext>
    </TileContext.Provider>
  );
};

export default TileProvider;

const createTiles = (letters: Letter[]) => {
  const boardTiles = createBoardTiles();
  const rackTiles = createRackTiles(letters);

  return [...boardTiles, ...rackTiles];
};

const createBoardTiles = () =>
  new Array(BOARD_WIDTH * BOARD_HEIGHT).fill(0).map(() => new Tile("board"));

const createRackTiles = (letters: Letter[]) =>
  letters.map((letter) => new Tile("rack", letter));

interface TileContextProps {
  tiles: {
    board: Tile[];
    rack: Tile[];
  };
  getNewIndex: NewIndexGetter;
}

export const TileContext = React.createContext<TileContextProps>({
  tiles: { board: [], rack: [] },
  getNewIndex: () => -1,
});
