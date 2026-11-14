export interface Player {
  id: string;
  username: string;
}

export interface Room {
  id: string;
  hostId: string;
  players: Player[];
  difficulty: Difficulty;
  lives: number;
  status: RoomStatus;
}

export type RoomOptions = Pick<Room, "difficulty" | "lives">;

export type RoomsResponse = { isOk: true; room: Room } | { isOk: false; error: RoomErrorCode };

export type RoomAckResponse = { isOk: true } | { isOk: false; error: RoomErrorCode };

export type RoomErrorCode = "ROOM_NOT_FOUND" | "NOT_HOST" | "GAME_ALREADY_STARTED";

export type RoomStatus = "WAITING" | "PLAYING" | "FINISHED";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
