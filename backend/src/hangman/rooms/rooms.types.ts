export interface Player {
  id: string;
  username: string;
}

export interface Room {
  id: string;
  hostId: string;
  players: Player[];
}
