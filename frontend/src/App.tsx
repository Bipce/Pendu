import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import Layout from "./components/Layout.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
