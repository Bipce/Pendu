import { socket } from "./socket.ts";
import { useHangmanStore } from "../store/hangmanStore.ts";
import type { AuthPayload } from "./socket.types.ts";

socket.on("connect", () =>
  useHangmanStore.setState({
    isConnected: true,
    localPlayer: { id: socket.id!, username: (socket.auth as AuthPayload).username },
  }),
);
socket.on("disconnect", () =>
  useHangmanStore.setState({ isConnected: false, room: undefined, localPlayer: undefined }),
);

socket.on("room_updated", room => useHangmanStore.setState({ room }));
