import { socket } from "./socket.ts";
import { useHangmanStore } from "../store/hangmanStore.ts";

socket.on("connect", () => useHangmanStore.setState({ isConnected: true }));
socket.on("disconnect", () => useHangmanStore.setState({ isConnected: false }));
