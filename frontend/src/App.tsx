import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => socket.emit("ping"));
    socket.on("pong", () => console.log(socket.id));

    return () => {
      socket.disconnect();
    };
  }, []);

  return <h1>Pendu</h1>;
}

export default App;
