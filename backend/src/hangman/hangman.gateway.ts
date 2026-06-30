import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { DefaultEventsMap, Socket } from "socket.io";
import { plainToInstance } from "class-transformer";
import { JoinDto } from "./dto/join.dto";
import { validateSync } from "class-validator";

interface HangmanSocketData {
  username: string;
}

type HangmanSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, HangmanSocketData>;

@WebSocketGateway({ cors: { origin: "http://localhost:5173" } })
export class HangmanGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
    if (client.data.username) console.log("Disconnect: ", client.data.username);
  }
}
