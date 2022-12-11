export interface Answer {
  date?: string;
  theme: string;
  letters: string;
  words: Word[];
}

interface Word {
  direction: string;
  start: Location;
  letters: string;
}

export interface Location {
  row: number;
  column: number;
}
