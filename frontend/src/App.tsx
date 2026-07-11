import { Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HomePage from "./pages/HomePage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index={true} element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/lobby" element={<LobbyPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
