import { Outlet } from "react-router";
import Navbar from "./Navbar.tsx";

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
