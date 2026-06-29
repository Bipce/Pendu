import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { DefaultEventsMap, Socket } from "socket.io";

interface HangmanSocketData {
  username: string;
}

type HangmanSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, HangmanSocketData>;

@WebSocketGateway({ cors: { origin: "http://localhost:5173" } })
export class HangmanGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: HangmanSocket) {
    const username: unknown = client.handshake.auth.username;

    if (typeof username !== "string" || username.trim() === "") {
      client.disconnect();
      return;
    }

    client.data.username = username;
    console.log(`${username} connected (${client.id})`);
  }

  handleDisconnect(client: HangmanSocket) {
    if (client.data.username) console.log("Disconnect: ", client.data.username);
  }
}
