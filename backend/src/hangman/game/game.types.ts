export interface Game {
  word: string;
  guessedLetters: string[];
  maxLives: number;
}

export type GameStatus = "PLAYING" | "WON" | "LOST";

export type GameError = "GAME_FINISHED" | "ALREADY_GUESSED";

export type GameResponse = { isOk: true } | { isOk: false; error: GameError };
