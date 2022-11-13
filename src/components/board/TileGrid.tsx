import React from "react";
import styled from "styled-components";
import Tile, { TileSize } from "../tile/Tile";
import { Tile as TileModel } from "../../model/Tile";

interface Props {
  tiles: TileModel[];
  tileSize?: TileSize;
  disabled?: boolean;
}

export const TileGrid: React.FC<Props> = ({ tiles, tileSize, disabled }) => {
  return (
    <Grid>
      {tiles.map((tile) => (
        <Tile
          key={tile.getID()}
          state={tile.getState()}
          id={tile.getID()}
          letter={tile.getLetter()}
          draggable={tile.isDraggable() && !disabled}
          disabled={tile.isDisabled() || disabled}
          size={tileSize}
          hasPlaceholder
        />
      ))}
    </Grid>
  );
};

export default TileGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  max-width: 350px;
  height: fit-content;
`;
