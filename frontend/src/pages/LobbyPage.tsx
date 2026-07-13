import { useState } from "react";
import { Navigate } from "react-router";
import { Check, Copy, Crown } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useHangmanStore } from "../store/hangmanStore.ts";
import DifficultyRadio from "../components/lobby/DifficultyRadio.tsx";
import LivesButton from "../components/lobby/LivesButton.tsx";
import TertiaryTitle from "../components/ui/TertiaryTitle.tsx";

const LobbyPage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [lives, setLives] = useState(6);
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
        className="bg-surface-raised/70 border-separator main-padding w-1/3 max-w-52 border-r"
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

      <section
        aria-labelledby="code-title"
        className="flex flex-1 flex-col items-center justify-center gap-20 px-8 py-5"
      >
        <div>
          <h2 className="text-content-secondary" id="code-title">
            Code de la partie
          </h2>

          <div className="mt-3 flex items-center gap-3">
            <p className="text-4xl font-bold tracking-widest">{room.id}</p>
            <button className="secondary-button flex items-center gap-2" onClick={handleCopy}>
              {!isCopied ? "Copier" : "Copié !"}
              <span>{!isCopied ? <Copy size={19} /> : <Check size={19} />}</span>
            </button>
          </div>
        </div>

        <section className="bg-surface-raised mt-10 rounded-md border border-sky-950 p-10" aria-labelledby="settings">
          <h2 id="settings" className="mb-8 text-lg font-bold">
            Paramètres
          </h2>

          <div className="mb-10">
            <TertiaryTitle title="Difficulté" />

            <fieldset className="flex">
              <DifficultyRadio id="easy" label="Facile" className="rounded-r-none" />
              <DifficultyRadio id="medium" label="Moyen" className="rounded-l-none rounded-r-none" />
              <DifficultyRadio id="hard" label="Difficile" className="rounded-l-none" />
            </fieldset>
          </div>

          <div>
            <TertiaryTitle title="Vies" />
            <LivesButton
              delta="-"
              onClick={() => {
                if (lives > 1) setLives(prev => prev - 1);
              }}
              className="rounded-r-none"
            />
            <label htmlFor="lives" className="sr-only">
              Nombre de vies
            </label>
            <input
              value={lives}
              type="number"
              id="lives"
              min={1}
              max={11}
              readOnly
              className="input-border appearance-none rounded-l-none rounded-r-none px-3 py-2"
            />
            <LivesButton
              delta="+"
              onClick={() => {
                if (lives < 11) setLives(prev => prev + 1);
              }}
              className="rounded-l-none"
            />
          </div>
        </section>

        <button className="main-button">Démarrer la partie</button>
      </section>
    </div>
  );
};

export default LobbyPage;
