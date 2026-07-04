import { Room, RoomsResponse } from "./rooms/rooms.types";
import { DefaultEventsMap, Socket } from "socket.io";

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

export interface HangmanSocketData {
  username: string;
  roomId?: string;
}

export type HangmanSocket = Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, HangmanSocketData>;
