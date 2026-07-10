import { Route, Routes } from "react-router";
import JoinPage from "./pages/JoinPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index={true} element={<JoinPage />} />
          <Route path="/lobby" element={<MenuPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
