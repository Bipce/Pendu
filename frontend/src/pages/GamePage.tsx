import { Navigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useHangmanStore } from "../store/hangmanStore.ts";

const GamePage = () => {
  const { room } = useHangmanStore(useShallow(s => ({ room: s.room })));

  if (!room) return <Navigate to="/menu" replace />;
  if (room.status === "WAITING") return <Navigate to="/lobby" replace />;

  return <div>Partie en cours</div>;
};

export default GamePage;
