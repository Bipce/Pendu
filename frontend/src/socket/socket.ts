import { io } from "socket.io-client";
import type { HangmanSocket } from "./socket.types.ts";

export const socket: HangmanSocket = io("http://localhost:3000", { autoConnect: false });
