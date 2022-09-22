import { Tile } from "./Tile";

/**
 * Represents an abstract container which stores tiles.
 */
export abstract class Container {
  protected tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
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
}
