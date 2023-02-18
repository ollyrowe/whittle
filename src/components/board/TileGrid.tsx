import React from "react";
import styled from "styled-components";
import Tile, { TileSize } from "../tile/Tile";
import { Tile as TileModel } from "../../model/Tile";

interface Props {
  /** The tiles to be rendered */
  tiles: TileModel[];
  /** The size of the tiles to be rendered */
  tileSize?: TileSize;
  /** Function used to get the score multiplier for a given tile */
  getTileMultiplier?: (tile: TileModel) => number;
  /** Whether the rendered tiles should appear disabled */
  disabled?: boolean;
  /** Function to be called upon doubling clicking a tile */
  onDoubleClickTile?: (tile: TileModel) => void;
}

const TileGrid = React.forwardRef<HTMLDivElement, Props>(
  (
    { tiles, tileSize, getTileMultiplier, disabled, onDoubleClickTile },
    ref
  ) => {
    return (
      <Grid ref={ref} data-testid="tile-grid">
        {tiles.map((tile) => (
          <Tile
            key={tile.getID()}
            state={tile.getState()}
            id={tile.getID()}
            letter={tile.getLetter()}
            draggable={tile.isDraggable() && !disabled}
            disabled={tile.isDisabled() || disabled}
            size={tileSize}
            onDoubleClick={() => onDoubleClickTile && onDoubleClickTile(tile)}
            multiplier={getTileMultiplier && getTileMultiplier(tile)}
            hasPlaceholder
          />
        ))}
      </Grid>
    );
  }
);

export default TileGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  height: fit-content;
`;
