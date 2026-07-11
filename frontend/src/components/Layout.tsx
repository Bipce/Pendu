import { Outlet } from "react-router";
import Header from "./Header.tsx";

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
