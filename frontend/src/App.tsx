import { Route, Routes } from "react-router";
import JoinPage from "./pages/JoinPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";

function App() {
  return (
    <Routes>
      <Route index={true} element={<JoinPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
    </Routes>
  );
}

export default App;
