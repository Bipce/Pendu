import { Socket } from "socket.io-client";
import type { Room, RoomAckResponse, RoomOptions, RoomsResponse } from "../types/room.types.ts";

export interface ServerToClientEvents {
  room_updated: (room: Room) => void;
}

export interface ClientToServerEvents {
  create_room: (ack: (res: RoomsResponse) => void) => void;
  join_room: (payload: JoinRoomPayload, ack: (res: RoomsResponse) => void) => void;
  set_options: (payload: SetOptionsPayload, ack: (res: RoomAckResponse) => void) => void;
  start_game: (ack: (res: RoomAckResponse) => void) => void;
}

export interface JoinRoomPayload {
  roomId: string;
}

export type SetOptionsPayload = Partial<RoomOptions>;

export interface AuthPayload {
  username: string;
}

export type HangmanSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
