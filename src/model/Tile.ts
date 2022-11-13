import { TileState } from "./enums/TileState";
import { Location } from "./enums/Location";
import { Letter } from "./enums/Letter";

export class Tile {
  /** The unique identifier of the tile */
  private id: number;
  /** The physical location of the tile within the game */
  private location: Location;
  /** The current state of the tile */
  private state: TileState;
  /** The letter being represented */
  private letter: Letter | undefined;
  /** Whether the tile is disabled */
  private disabled: boolean;

  /** Used to support ID generation */
  private static tileCount = 0;

  constructor(location: Location, letter?: Letter) {
    this.id = Tile.tileCount++;
    this.location = location;
    this.state = TileState.DEFAULT;
    this.letter = letter;
    this.disabled = false;
  }

  /**
   * Gets the id of the tile.
   *
   * @returns the id.
   */
  getID() {
    return this.id;
  }

  /**
   * Gets the current location of the tile.
   *
   * @returns the location.
   */
  getLocation() {
    return this.location;
  }

  /**
   * Sets the current location of the tile.
   *
   * @param location - the new location
   */
  setLocation(location: Location) {
    this.location = location;
  }

  /**
   * Gets the current state of the tile.
   *
   * @returns the state.
   */
  getState() {
    return this.state;
  }

  /**
   * Determines whether the tile is in the 'correct' state.
   *
   * @returns whether the tile is correct.
   */
  isCorrect() {
    return this.state === TileState.CORRECT;
  }

  /**
   * Determines whether the tile is in the 'partially correct' state.
   *
   * @returns whether the tile is partially correct.
   */
  isPartiallyCorrect() {
    return this.state === TileState.PARTIALLY_CORRECT;
  }

  /**
   * Sets the state of the tile.
   *
   * @param state - the new state.
   */
  setState(state: TileState) {
    this.state = state;
  }

  /**
   * Resets the state of the tile.
   */
  reset() {
    this.state = TileState.DEFAULT;
  }

  /**
   * Gets the tile letter.
   *
   * @returns the tile letter.
   */
  getLetter() {
    return this.letter;
  }

  /**
   * Determines whether the tile has an associated letter.
   *
   * @returns boolean indicating whether there is a letter.
   */
  hasLetter() {
    return !!this.letter;
  }

  /**
   * Determines whether the tile is able to be dragged.
   *
   * @returns boolean indicate whether the tile is draggable.
   */
  isDraggable() {
    // Tiles without letters cannot be dragged
    return this.hasLetter();
  }

  /**
   * Determines whether the tile is disabled.
   *
   * @returns boolean indicate whether the tile is disabled.
   */
  isDisabled() {
    return this.disabled;
  }

  /**
   * Disables the tile.
   */
  disable() {
    this.disabled = true;
  }

  /**
   * Enables the tile.
   */
  enable() {
    this.disabled = false;
  }
}
