import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useHangmanStore } from "../store/hangmanStore.ts";
import { ERROR_MESSAGES } from "../constantes.ts";

const MenuPage = () => {
  const { createRoom, joinRoom, room } = useHangmanStore(
    useShallow(s => ({ createRoom: s.createRoom, joinRoom: s.joinRoom, room: s.room })),
  );
  const [roomId, setRoomId] = useState("");
  const [roomErrorMessage, setRoomErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    const res = await joinRoom({ roomId });

    if (res.isOk === false) {
      setRoomErrorMessage(ERROR_MESSAGES[res.error]);
      return;
    }
    setRoomErrorMessage("");
  };

  const handleCreateRoom = async () => {
    await createRoom();
  };

  useEffect(() => {
    if (room) navigate("/lobby");
  }, [room, navigate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <section className="flex flex-col items-center justify-center">
        <div className="mb-2 flex items-baseline gap-1">
          <input type="checkbox" className="input-field autofill-fix" id="isPrivate" />
          <label htmlFor="isPrivate">Private</label>
        </div>

        <button className="main-button main-padding" onClick={handleCreateRoom}>
          Créer une partie
        </button>
      </section>

      <div className="w-1/5 border-t border-slate-600" />

      <section className="flex flex-col items-center justify-center">
        <input
          type="text"
          className="input-field autofill-fix px-4 py-2"
          id="roomId"
          placeholder="Entrez l'id de la partie"
          onChange={e => setRoomId(e.target.value)}
          aria-label="Id de la partie"
        />

        <button className="main-button main-padding mx-auto my-2 w-fit" onClick={handleJoinRoom}>
          Rejoindre
        </button>
        <p className="error-message">{roomErrorMessage}</p>
      </section>
    </div>
  );
};

export default MenuPage;
