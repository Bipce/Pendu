import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useHangmanStore } from "../store/hangmanStore.ts";

const schema = z.object({
  username: z.string().trim().min(1, "Ce champ est obligatoire.").max(20, "Maximum 20 caractères."),
});

const JoinPage = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { connect, isConnected } = useHangmanStore(
    useShallow(s => ({ connect: s.connect, isConnected: s.isConnected })),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected === true) navigate("/lobby");
  }, [isConnected, navigate]);

  const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse({ username });
    const { success, data, error } = result;

    if (success === false) {
      setErrorMessage(error.issues[0].message);
      return;
    }

    connect(data.username);
    setErrorMessage("");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <form onSubmit={handleOnSubmit} className="px-30 py-10 text-center">
        <div className="mt-10 text-left">
          <label htmlFor="username">Pseudo</label>
          <div>
            <input
              type="text"
              id="username"
              onChange={handleOnChange}
              className="autofill-fix input-field mt-2 px-4 py-2"
            />
            <p className="error-message">{errorMessage}</p>
          </div>
        </div>

        <button disabled={username.length === 0} className="main-button w-full px-4 py-2" type="submit">
          Rejoindre
        </button>
      </form>
    </div>
  );
};

export default JoinPage;
