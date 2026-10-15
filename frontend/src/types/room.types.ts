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
}

export type RoomOptions = Pick<Room, "difficulty" | "lives">;

export type RoomsResponse = { isOk: true; room: Room } | { isOk: false; error: RoomErrorCode };

export type RoomAckResponse = { isOk: true } | { isOk: false; error: RoomErrorCode };

export type RoomErrorCode = "ROOM_NOT_FOUND" | "NOT_HOST";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
