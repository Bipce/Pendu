export interface Player {
  id: string;
  username: string;
}

export interface Room {
  id: string;
  hostId: string;
  players: Player[];
}

export interface ReturnResponse {
  isOk: boolean;
  room: Room;
}
