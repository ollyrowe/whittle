import React, { useEffect, useMemo, useState } from "react";
import { alpha, Theme, useTheme } from "@mui/material";
import styled from "styled-components";
import { useConditionCount } from "../../hooks/useConditionCount";
import { useConditionTimer } from "../../hooks/useConditionTimer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getNewIndex } from "../providers/GameProvider";
import { TileState } from "../../model/enums/TileState";
import { Letter } from "../../model/enums/Letter";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  id?: number;
  letter?: Letter;
  state?: TileState;
  hasPlaceholder?: boolean;
  size?: TileSize;
  /** Whether the tile can be dragged */
  draggable?: boolean;
  /** Whether the tile cannot be swapped */
  disabled?: boolean;
}

export const Tile: React.FC<Props> = ({
  id = -1,
  letter,
  state = TileState.DEFAULT,
  hasPlaceholder = false,
  size = "medium",
  draggable = true,
  disabled = false,
  ...otherProps
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
    disabled: !draggable,
    data: { hasOverTimerLapsed },
    transition: sortTransition,
  });

  // Record the number of times the tile has entered a dragging or over state
  const dragCounter = useConditionCount(isDragging);
  const overCounter = useConditionCount(isOver);

  // Detect whether this tile has been hovered over for the required time period
  const isOverTimerState = useConditionTimer(isOver, HOVER_PERIOD);

  // Whether the tile is being dragged or transitioning back after being dropped
  const isInDragMotion =
    !useConditionTimer(!isDragging, sortTransition.duration) && dragCounter > 0;

  // Whether the tile is being hovered over or transitioning back after being hovered over
  const isInOverMotion =
    !useConditionTimer(
      isInDragMotion || !isOverTimerState,
      sortTransition.duration
    ) && overCounter > 0;

  const isMoving = isInDragMotion || isInOverMotion;

  // Upon change to the isOver timer state, update the local state accordingly
  useEffect(() => setHasOverTimerLapsed(isOverTimerState), [isOverTimerState]);

  // Whether the sortable transformation should be applied to the tile
  const applyTransformation = isDragging || !hasLetter || hasOverTimerLapsed;

  // Transformation styles to be applied to the draggable element
  const style = {
    transform: CSS.Transform.toString(applyTransformation ? transform : null),
    transition:
      (transition ? transition + "," : "") +
      "background-color 300ms cubic-bezier(0.19, 1, 0.22, 1)",
  };

  // The colour of the tile based on the state
  const color = useMemo(() => {
    switch (state) {
      case TileState.CORRECT:
        return theme.palette.tile.green;
      case TileState.PARTIALLY_CORRECT:
        return theme.palette.tile.amber;
      case TileState.CORRECT_THEME_WORD:
        return theme.palette.tile.blue;
      default:
        return theme.palette.tile.default;
    }
  }, [state, theme]);

  return (
    <Placeholder
      size={size}
      visible={hasPlaceholder}
      disabled={disabled}
      data-testid="placeholder"
    >
      <Box
        ref={setNodeRef}
        size={size}
        isBlank={!hasLetter}
        isDragging={isDragging}
        isMoving={isMoving}
        color={color}
        style={style}
        data-testid="tile"
        {...otherProps}
        {...attributes}
        {...listeners}
      >
        {letter}
      </Box>
    </Placeholder>
  );
};

export default Tile;

export type TileSize = "small" | "medium" | "large";

/** The hover time period in milliseconds */
const HOVER_PERIOD = 150;

interface PlaceholderProps {
  visible: boolean;
  size: TileSize;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Placeholder div which applies an inset border around the tile.
 */
const Placeholder = styled.div<PlaceholderProps>`
  box-shadow: ${(props) =>
    props.visible &&
    !props.disabled &&
    "inset 0px 0px 0px 2px " + props.theme.palette.border};
  margin: ${(props) => (props.theme.isSmallDisplay ? "2px" : "2.5px")};
  width: ${(props) => getTileSize(props.theme, props.size)}px;
  height: ${(props) => getTileSize(props.theme, props.size)}px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.disabled && alpha(props.theme.palette.border, 0.4)};
`;

interface BoxProps {
  size: TileSize;
  isBlank?: boolean;
  isDragging?: boolean;
  isMoving?: boolean;
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
  width: ${(props) => getTileSize(props.theme, props.size)}px;
  height: ${(props) => getTileSize(props.theme, props.size)}px;
  padding-bottom: 5px;
  user-select: none;
  flex-shrink: 0;
  opacity: ${(props) => (props.isBlank ? 0 : 1)};
  box-shadow: ${(props) =>
      props.isDragging &&
      "2px 4px 10px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.25), "}
    inset 0px -5px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: ${(props) => (props.isDragging ? 9999 : props.isMoving ? 9998 : 1)};
`;

type SizeMapping<T> = { [size in TileSize]: T };

const fontSize: SizeMapping<string> = {
  small: "x-large",
  medium: "x-large",
  large: "xx-large",
};

const defaultTileSizes: SizeMapping<number> = {
  small: 37,
  medium: 44,
  large: 62,
};

const smallTileSizes: SizeMapping<number> = {
  small: 35,
  medium: 44,
  large: 56,
};

const getTileSize = (theme: Theme, size: TileSize) => {
  const sizes = theme.isSmallDisplay ? smallTileSizes : defaultTileSizes;

  return sizes[size];
};

const sortTransition = {
  duration: 200,
  easing: "ease",
};
