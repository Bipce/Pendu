export interface Player {
  id: string;
  username: string;
}

export interface Room {
  id: string;
  hostId: string;
  players: Player[];
}

export type RoomsResponse = { isOk: true; room: Room } | { isOk: false; error: RoomErrorCode };

export type RoomErrorCode = "ROOM_NOT_FOUND";
