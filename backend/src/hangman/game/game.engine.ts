import { Game, GameResponse, GameStatus } from "./game.types";
import { Difficulty, RoomOptions } from "../rooms/rooms.types";
import { WORDS } from "./game.words";

export const getMaskedWord = ({ guessedLetters, word }: Game): (string | null)[] => {
  const splitWord = word.split("");
  return splitWord.map(letter => (guessedLetters.includes(letter) ? letter : null));
};

export const getWrongLetters = ({ guessedLetters, word }: Game): string[] => {
  return guessedLetters.filter(letter => !word.includes(letter));
};

export const getRemainingLives = (game: Game): number => {
  const wrongLettersLength = getWrongLetters(game).length;
  return game.maxLives - wrongLettersLength;
};

export const getStatus = (game: Game): GameStatus => {
  const remainingLives = getRemainingLives(game);
  if (remainingLives <= 0) return "LOST";

  const maskedWord = getMaskedWord(game);
  if (!maskedWord.includes(null)) return "WON";

  return "PLAYING";
};

export const guessLetter = (game: Game, letter: string): GameResponse => {
  const normalizedLetter = letter.toLowerCase();

  const status = getStatus(game);
  if (status !== "PLAYING") return { isOk: false, error: "GAME_FINISHED" };
  if (game.guessedLetters.includes(normalizedLetter)) return { isOk: false, error: "ALREADY_GUESSED" };

  game.guessedLetters.push(normalizedLetter);

  return { isOk: true };
};

export const getRandomWord = (difficulty: Difficulty): string => {
  const list = WORDS[difficulty];
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};

export const createGame = ({ difficulty, lives }: RoomOptions): Game => {
  const word = getRandomWord(difficulty);
  const guessedLetters: string[] = [];
  const maxLives = lives;

  return { word, guessedLetters, maxLives };
};
