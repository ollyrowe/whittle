// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Type } from "class-transformer";
import { Tile } from "./Tile";

/**
 * Represents an abstract container which stores tiles.
 */
export abstract class Container {
  /** The contained tiles */
  @Type(() => Tile)
  protected tiles: Tile[];

  /** Whether the tile statuses are up-to-date */
  protected updated: boolean;

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
    this.updated = false;
  }

  /**
   * Gets the contained tiles.
   *
   * @returns the tiles.
   */
  getTiles() {
    return this.tiles;
  }

  /**
   * Swaps the place of two tiles.
   *
   * If neither tile is found within the container, no tiles are swapped.
   * If only one tile is found within the container, that tile is replaced by the other.
   *
   * @param firstTile - the first tile.
   * @param secondTile - the second tile.
   */
  swapTiles(firstTile: Tile, secondTile: Tile) {
    this.tiles = this.tiles.map((tile) =>
      tile.getID() === firstTile.getID()
        ? secondTile
        : tile.getID() === secondTile.getID()
        ? firstTile
        : tile
    );
    // The tile statuses may no longer be up-to-date
    this.updated = false;
  }

  /**
   * Determines whether a specified tile is present within the container.
   *
   * @param tile - the tile to be found.
   * @returns boolean indicating whether the tile is present.
   */
  includes(tile: Tile) {
    return this.tiles.some((t) => t.getID() === tile.getID());
  }

  /**
   * Determines whether this container's tiles have been updated.
   *
   * @return boolean indicating whether the container's tiles have been updated.
   */
  isUpdated() {
    return this.updated;
  }

  /**
   * Whether the container has a tile with a letter.
   *
   * @returns whether a letter tile is present.
   */
  hasLetterTile() {
    return !!this.tiles.find((tile) => tile.hasLetter());
  }

  /**
   * Updates the states of the contained tiles.
   */
  abstract updateTileStatuses(): void;
}
