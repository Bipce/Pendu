export interface Game {
  word: string;
  guessedLetters: string[];
  maxLives: number;
}

export type GameStatus = "PLAYING" | "WON" | "LOST";
