import { create } from "zustand";
import { socket } from "../socket/socket.ts";
import type { Player, Room, RoomsResponse } from "../types/room.types.ts";
import type { AuthPayload, JoinRoomPayload } from "../socket/socket.types.ts";

interface HangmanState {
  isConnected: boolean;
  room: Room | undefined;
  localPlayer: Player | undefined;
  connect: (username: string) => void;
  disconnect: () => void;
  createRoom: () => Promise<void>;
  joinRoom: (data: JoinRoomPayload) => Promise<RoomsResponse>;
}

export const useHangmanStore = create<HangmanState>(set => ({
  isConnected: false,
  room: undefined,
  localPlayer: undefined,

  connect: username => {
    socket.auth = { username } satisfies AuthPayload;
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
