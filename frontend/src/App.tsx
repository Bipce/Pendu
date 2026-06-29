import { io } from "socket.io-client";
import { useEffect, useState, type SubmitEvent, type ChangeEvent } from "react";

function App() {
  const [username, setUsername] = useState("");
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
    setJoined(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="m-10 flex min-h-dvh flex-col items-center">
      <header>
        <h1>Pendu</h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center">
        <form onSubmit={handleOnSubmit} className="text-center">
          <div className="flex items-center gap-4">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              id="username"
              onChange={handleOnChange}
              className="rounded border border-purple-800/70 px-4 py-2"
            />
          </div>
          <button
            className="mt-10 rounded border border-purple-800/70 p-4 hover:cursor-pointer hover:bg-purple-800"
            type="submit"
          >
            Join game
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
