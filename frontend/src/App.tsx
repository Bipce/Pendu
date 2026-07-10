import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="/lobby" element={<MenuPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
