import { Route, Routes } from "react-router";
import JoinPage from "./pages/JoinPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index={true} element={<JoinPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
