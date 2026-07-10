import type { RoomErrorCode } from "./types/room.types.ts";

export const ERROR_MESSAGES: Record<RoomErrorCode, string> = {
  ROOM_NOT_FOUND: "Cette partie n'existe pas.",
};
