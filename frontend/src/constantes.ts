import type { RoomErrorCode } from "./types/room.types.ts";

export const ERROR_MESSAGES: Record<RoomErrorCode, string> = {
  ROOM_NOT_FOUND: "Cette partie n'existe pas.",
  NOT_HOST: "Seul l'hôte peut modifier les paramètres.",
};
