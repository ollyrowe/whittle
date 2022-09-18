import React, { useContext } from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import { TileContext } from "./TileProvider";
import { Letter } from "../../model/Letter";

type TileSize = "regular" | "small";

interface Props {
  id: number;
  letter?: Letter;
  hasPlaceholder?: boolean;
  size?: TileSize;
}

export const Tile: React.FC<Props> = ({
  id,
  letter,
  hasPlaceholder = false,
  size = "regular",
}) => {
  const { getNewIndex } = useContext(TileContext);

  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({
      id,
      getNewIndex,
      /* Tiles without letters cannot be moved */
      disabled: !letter,
    });

  return (
    <Placeholder size={size} visible={hasPlaceholder}>
      <Box
        ref={setNodeRef}
        size={size}
        isBlank={!letter}
        transform={transform}
        transition={transition}
        {...attributes}
        {...listeners}
      >
        {letter?.getValue()}
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
  width: ${(props) => placeholderSize[props.size]}px;
  height: ${(props) => placeholderSize[props.size]}px;
`;

interface BoxProps {
  size: TileSize;
  isBlank: boolean;
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
  background-color: ${(props) => props.theme.border};
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 2px;
  width: ${(props) => tileSize[props.size]}px;
  height: ${(props) => tileSize[props.size]}px;
  user-select: none;
  flex-shrink: 0;
  opacity: ${(props) => (props.isBlank ? 0 : 1)};
  transform: ${(props) => CSS.Transform.toString(props.transform)};
  transition: ${(props) => props.transition};
`;

type SizeMapping = { [size in TileSize]: string | number };

const fontSize: SizeMapping = {
  small: "x-large",
  regular: "xx-large",
};

const placeholderSize: SizeMapping = {
  small: 37,
  regular: 65,
};

const tileSize: SizeMapping = {
  small: 33,
  regular: 61,
};
