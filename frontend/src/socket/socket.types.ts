import { Socket } from "socket.io-client";
import type { Room, RoomsResponse } from "../types/room.types.ts";

export interface ServerToClientEvents {
  room_updated: (room: Room) => void;
}

export interface ClientToServerEvents {
  create_room: (ack: (res: RoomsResponse) => void) => void;
  join_room: (payload: JoinRoomPayload, ack: (res: RoomsResponse) => void) => void;
}

export interface JoinRoomPayload {
  roomId: string;
}

export type HangmanSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
