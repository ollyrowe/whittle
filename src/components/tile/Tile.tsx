import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import styled from "styled-components";
import { useConditionTimer } from "../../hooks/useConditionTimer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getNewIndex } from "../providers/GameProvider";
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

  // Whether this tile has been hovered over for the required time period
  const [hasOverTimerLapsed, setHasOverTimerLapsed] = useState(false);

  // Whether this tile has a letter
  const hasLetter = !!letter;

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
    setNodeRef,
  } = useSortable({
    id,
    getNewIndex,
    disabled,
    data: { hasOverTimerLapsed },
  });

  // Detect whether this tile has been hovered over for the required time period
  const isOverTimerState = useConditionTimer(isOver, HOVER_PERIOD);

  // Upon change to the isOver timer state, update the local state accordingly
  useEffect(() => setHasOverTimerLapsed(isOverTimerState), [isOverTimerState]);

  // Whether the sortable transformation should be applied to the tile
  const applyTransformation = isDragging || !hasLetter || hasOverTimerLapsed;

  // Transformation styles to be applied to the draggable element
  const style = {
    transform: CSS.Transform.toString(applyTransformation ? transform : null),
    transition,
  };

  const getTileColor = () => {
    switch (state) {
      case TileState.CORRECT:
        return theme.palette.tile.green;
      case TileState.PARTIALLY_CORRECT:
        return theme.palette.tile.amber;
      default:
        return theme.palette.tile.default;
    }
  };

  return (
    <Placeholder size={size} visible={hasPlaceholder}>
      <Box
        ref={setNodeRef}
        size={size}
        isBlank={!hasLetter}
        isDragging={isDragging}
        isOver={isOver}
        color={getTileColor()}
        style={style}
        {...attributes}
        {...listeners}
      >
        {letter}
      </Box>
    </Placeholder>
  );
};

export default Tile;

/** The hover time period in milliseconds */
const HOVER_PERIOD = 150;

interface PlaceholderProps {
  visible: boolean;
  size: TileSize;
  children?: React.ReactNode;
}

/**
 * Placeholder div which applies an inset border around the tile.
 */
const Placeholder = styled.div<PlaceholderProps>`
  box-shadow: ${(props) =>
    props.visible && "inset 0px 0px 0px 2px " + props.theme.palette.border};
  margin: 2.5px;
  width: ${(props) => tileSize[props.size]}px;
  height: ${(props) => tileSize[props.size]}px;
  border-radius: 4px;
`;

interface BoxProps {
  size: TileSize;
  isBlank?: boolean;
  isDragging?: boolean;
  isOver?: boolean;
  color?: string;
}

/**
 * Square box which renders the letter.
 */
export const Box = styled.div<BoxProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => fontSize[props.size]};
  font-weight: bold;
  background-color: ${(props) =>
    props.color || props.theme.palette.tile.default};
  border-radius: 4px;
  width: ${(props) => tileSize[props.size]}px;
  height: ${(props) => tileSize[props.size]}px;
  padding-bottom: 5px;
  user-select: none;
  flex-shrink: 0;
  opacity: ${(props) => (props.isBlank ? 0 : 1)};
    background-color 1s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: ${(props) =>
    props.isDragging &&
    "2px 4px 10px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.25), "}
    inset 0px -5px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: ${(props) =>
    props.isDragging ? 9999 : props.isOver ? 9998 : "auto"};
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
