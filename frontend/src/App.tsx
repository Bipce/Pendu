import { io } from "socket.io-client";
import { useEffect, useState, type SubmitEvent, type ChangeEvent } from "react";
import { z } from "zod";

const schema = z.object({
  username: z.string().trim().min(1, "Ce champ est obligatoire.").max(20, "Maximum 20 caractères."),
});

function App() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!joined) return;

    const socket = io("http://localhost:3000", { auth: { username } });

    return () => {
      socket.disconnect();
    };
  }, [username, joined]);

  const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse({ username });

    if (result.success === false) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }

    setJoined(true);
    setUsername(result.data.username);
    setErrorMessage("");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center p-10">
      <header>
        <h1>Pendu</h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center">
        <form onSubmit={handleOnSubmit} className="text-center">
          <div className="flex items-baseline gap-4">
            <label htmlFor="username">Pseudo : </label>
            <div>
              <input
                disabled={joined}
                type="text"
                id="username"
                onChange={handleOnChange}
                className="mb-2 rounded border border-purple-800/70 px-4 py-2 disabled:cursor-not-allowed"
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>

          <button
            disabled={username.length === 0 || joined}
            className="mt-10 rounded border border-purple-800/70 p-4 hover:cursor-pointer hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-transparent"
            type="submit"
          >
            Rejoindre
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
