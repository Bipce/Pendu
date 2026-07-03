import { create } from "zustand";
import { socket } from "../socket/socket.ts";

interface HangmanState {
  isConnected: boolean;
  connect: (username: string) => void;
}

export const useHangmanStore = create<HangmanState>(() => ({
  isConnected: false,

  connect: username => {
    socket.auth = { username };
    socket.connect();
  },
}));
