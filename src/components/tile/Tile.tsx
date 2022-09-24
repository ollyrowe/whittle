import React, { useContext } from "react";
import styled, { useTheme } from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import { GameContext } from "../providers/GameProvider";
import { TileState } from "../../model/enums/TileState";
import { Letter } from "../../model/enums/Letter";

type TileSize = "regular" | "small";

interface Props {
  id: number;
  state: TileState;
  letter?: Letter;
  hasPlaceholder?: boolean;
  size?: TileSize;
  disabled?: boolean;
}

export const Tile: React.FC<Props> = ({
  id,
  state,
  letter,
  hasPlaceholder = false,
  size = "regular",
  disabled = false,
}) => {
  const theme = useTheme();

  const { getNewIndex } = useContext(GameContext);

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id, getNewIndex, disabled });

  const getTileColor = () => {
    switch (state) {
      case TileState.CORRECT:
        return theme.green;
      case TileState.PARTIALLY_CORRECT:
        return theme.amber;
      default:
        return theme.border;
    }
  };

  return (
    <Placeholder size={size} visible={hasPlaceholder}>
      <Box
        ref={setNodeRef}
        size={size}
        isBlank={!letter}
        isDragging={isDragging}
        color={getTileColor()}
        transform={transform}
        transition={transition}
        {...attributes}
        {...listeners}
      >
        {letter}
      </Box>
    </Placeholder>
  );
};

export default Tile;

interface PlaceholderProps {
  visible: boolean;
  size: TileSize;
  children?: React.ReactNode;
}

/**
 * Placeholder div which applies an inset border around the tile.
 */
const Placeholder = styled.div<PlaceholderProps>`
  box-shadow: ${(props) => props.visible && "inset 0px 0px 0px 2px #d3d6da"};
  margin: 2.5px;
  width: ${(props) => tileSize[props.size]}px;
  height: ${(props) => tileSize[props.size]}px;
  border-radius: 4px;
`;

interface BoxProps {
  size: TileSize;
  isBlank: boolean;
  isDragging?: boolean;
  color?: string;
  transform: Transform | null;
  transition?: string;
}

/**
 * Square box which renders the letter.
 */
export const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => fontSize[props.size]};
  font-weight: bold;
  background-color: ${(props) => props.color || props.theme.border};
  border-radius: 4px;
  width: ${(props) => tileSize[props.size]}px;
  height: ${(props) => tileSize[props.size] - 5}px;
  padding-bottom: 5px;
  user-select: none;
  flex-shrink: 0;
  opacity: ${(props) => (props.isBlank ? 0 : 1)};
  transform: ${(props) => CSS.Transform.toString(props.transform)};
  transition: ${(props) => props.transition && props.transition + ","}
    background-color 1s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: ${(props) =>
      props.isDragging &&
      "2px 4px 10px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.25), "}
    inset 0px -5px 0px 0px rgba(0, 0, 0, 0.1);
`;

type SizeMapping<T> = { [size in TileSize]: T };

const fontSize: SizeMapping<string> = {
  small: "x-large",
  regular: "xx-large",
};

const tileSize: SizeMapping<number> = {
  small: 37,
  regular: 62,
};
