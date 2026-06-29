import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "http://localhost:5173" } })
export class HangmanGateway {
  @SubscribeMessage("ping")
  handlePingPong(client: Socket): void {
    console.log("ping received by: ", client.id);
    client.emit("pong");
  }
}
