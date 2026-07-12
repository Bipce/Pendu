import { useState } from "react";
import { Navigate } from "react-router";
import { Check, Copy, Crown } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useHangmanStore } from "../store/hangmanStore.ts";

const LobbyPage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { room, localPlayer } = useHangmanStore(useShallow(s => ({ room: s.room, localPlayer: s.localPlayer })));

  if (!room) return <Navigate to="/menu" replace />;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(room.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-1">
      <section
        aria-labelledby="players-title"
        className="bg-surface-raised/70 border-separator w-1/3 max-w-52 border-r px-4 py-2"
      >
        <h2 id="players-title" className="text-content-secondary mb-5 font-bold">
          JOUEURS
          <span className="mx-1 text-3xl" aria-hidden={true}>
            .
          </span>
          {room.players.length}
        </h2>
        <ul>
          {room.players.map(p => (
            <li
              key={p.id}
              className={`mb-2 flex items-center gap-2 ${localPlayer?.id === p.id ? "text-content-tertiary" : ""}`}
            >
              {room.hostId === p.id && (
                <>
                  <span className="sr-only">hôte</span>
                  <Crown size={19} className="text-yellow-400" />
                </>
              )}
              {p.username}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="code-title" className="flex-1 px-8 py-5">
        <h2 className="text-content-secondary" id="code-title">
          Code de la partie
        </h2>

        <div className="mt-3 flex items-center gap-3">
          <p className="text-4xl font-bold tracking-widest">{room.id}</p>
          <button className="secondary-button flex items-center gap-2 px-4 py-2" onClick={handleCopy}>
            {!isCopied ? "Copier" : "Copié !"}
            <span>{!isCopied ? <Copy size={19} /> : <Check size={19} />}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LobbyPage;
