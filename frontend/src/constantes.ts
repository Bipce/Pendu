import type { RoomErrorCode } from "./types/room.types.ts";

export const ERROR_MESSAGES: Record<RoomErrorCode, string> = {
  ROOM_NOT_FOUND: "Cette partie n'existe pas.",
  NOT_HOST: "Action autorisée à l'hôte uniquement.",
  GAME_ALREADY_STARTED: "Partie déjà commencée.",
};
