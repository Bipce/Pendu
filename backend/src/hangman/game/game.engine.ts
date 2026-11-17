import { Game } from "./game.types";

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
