import { Injectable } from "@nestjs/common";
import { Player, Room } from "./rooms.types";

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();

  create(host: Player): Room {
    const key = crypto.randomUUID().slice(0, 6);
    const room: Room = { id: key, hostId: host.id, players: [host] };

    this.rooms.set(key, room);

    return room;
  }

  get(id: string): Room | undefined {
    return this.rooms.get(id);
  }
}
