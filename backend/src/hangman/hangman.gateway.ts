import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { DefaultEventsMap, Server, Socket } from "socket.io";
import { plainToInstance } from "class-transformer";
import { JoinDto } from "./dto/join.dto";
import { validateSync } from "class-validator";
import { RoomsService } from "./rooms/rooms.service";
import { Player, RoomsResponse } from "./rooms/rooms.types";

interface HangmanSocketData {
  username: string;
  roomId?: string;
}

type HangmanSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, HangmanSocketData>;

@WebSocketGateway({ cors: { origin: "http://localhost:5173" } })
export class HangmanGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(client: HangmanSocket) {
    // The username comes from the client-controlled handshake, so it is untrusted: type it as unknown.
    const username: unknown = client.handshake.auth.username;

    // Validate manually instead of with a ValidationPipe: handleConnection is not a @SubscribeMessage
    // handler, so no pipe runs on it. validateSync returns the list of violations (empty = valid).
    const instance = plainToInstance(JoinDto, { username });
    const errors = validateSync(instance, { whitelist: true });

    // Reject the connection when the username does not satisfy the DTO constraints.
    if (errors.length > 0) {
      client.disconnect();
      return;
    }

    client.data.username = instance.username;
    console.log(`${instance.username} connected (${client.id})`);
  }

  handleDisconnect(client: HangmanSocket) {
    if (!client.data.roomId) return;

    const room = this.roomsService.leave(client.data.roomId, client.id);
    if (room) this.server.to(room.id).emit("room_updated", room);
  }

  @SubscribeMessage("create_room")
  async createRoom(@ConnectedSocket() client: HangmanSocket): Promise<RoomsResponse> {
    const player: Player = { id: client.id, username: client.data.username };
    const room = this.roomsService.create(player);
    await client.join(room.id);
    client.data.roomId = room.id;

    return { isOk: true, room };
  }

  @SubscribeMessage("join_room")
  async joinRoom(
    @ConnectedSocket() client: HangmanSocket,
    @MessageBody() data: { roomId: string },
  ): Promise<RoomsResponse> {
    const player: Player = { id: client.id, username: client.data.username };
    const room = this.roomsService.join(data.roomId, player);

    if (!room) return { isOk: false, error: "Room not found" };
    await client.join(data.roomId);
    client.data.roomId = room.id;

    return { isOk: true, room };
  }
}
