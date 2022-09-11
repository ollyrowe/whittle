import { Location } from "./enums/Location";
import { Letter } from "./Letter";

export class Tile {
  private id: number;
  private location: Location;
  private letter: Letter | undefined;

  /** Used to support ID generation */
  private static tileCount = 0;

  constructor(location: Location, letter?: Letter) {
    this.id = Tile.tileCount++;
    this.location = location;
    this.letter = letter;
  }

  getID() {
    return this.id;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location: Location) {
    this.location = location;
  }

  getLetter() {
    return this.letter;
  }
}
