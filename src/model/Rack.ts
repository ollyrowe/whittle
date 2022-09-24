import { Container } from "./Container";

/**
 * Represents the rack containing the tiles to be placed
 * onto the board.
 */
export class Rack extends Container {
  updateTileStatuses() {
    // Reset the state of each tile
    this.tiles.forEach((tile) => tile.reset());
    // Update the updated state
    this.updated = true;
  }
}
