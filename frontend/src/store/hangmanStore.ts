import { create } from "zustand";
import { socket } from "../socket/socket.ts";
import type { Room, RoomsResponse } from "../types/room.types.ts";
import type { JoinRoomPayload } from "../socket/socket.types.ts";

interface HangmanState {
  isConnected: boolean;
  room: Room | undefined;
  connect: (username: string) => void;
  disconnect: () => void;
  createRoom: () => Promise<void>;
  joinRoom: (data: JoinRoomPayload) => Promise<RoomsResponse>;
}

export const useHangmanStore = create<HangmanState>(set => ({
  isConnected: false,
  room: undefined,

  connect: username => {
    socket.auth = { username };
    socket.connect();
  },

  disconnect: () => {
    socket.disconnect();
  },

  createRoom: async () => {
    const res = await socket.emitWithAck("create_room");
    if (res.isOk) set({ room: res.room });
  },

  joinRoom: async data => {
    const res = await socket.emitWithAck("join_room", data);
    if (res.isOk) set({ room: res.room });
    return res;
  },
}));
