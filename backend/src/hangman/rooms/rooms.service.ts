import { Injectable } from "@nestjs/common";
import { Player, Room } from "./rooms.types";

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();

  create(host: Player): Room {
    const roomId = crypto.randomUUID().slice(0, 6);
    const room: Room = { id: roomId, hostId: host.id, players: [host] };

    this.rooms.set(roomId, room);

    return room;
  }

  get(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  join(roomId: string, player: Player): Room | undefined {
    const room = this.get(roomId);

    if (!room) return undefined;
    room.players.push(player);

    return room;
  }

  leave(roomId: string, playerId: string): Room | undefined {
    const room = this.get(roomId);
    if (!room) return undefined;

    const players = room.players.filter(p => p.id !== playerId);
    room.players = players;

    if (players.length === 0) {
      this.rooms.delete(roomId);
      return undefined;
    }

    if (playerId === room.hostId) room.hostId = players[0].id;

    return room;
  }
}
