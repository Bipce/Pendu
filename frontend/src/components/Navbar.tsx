import { LogOut } from "lucide-react";
import { useHangmanStore } from "../store/hangmanStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { isConnected, disconnect } = useHangmanStore(
    useShallow(s => ({ disconnect: s.disconnect, isConnected: s.isConnected })),
  );

  const handleLogout = () => {
    disconnect();
    navigate("/");
  };

  return (
    <header className="bg-surface-raised sticky top-0 z-10 flex items-center justify-between px-15 py-5">
      {isConnected ? (
        <button onClick={handleLogout} className="main-button p-1.5">
          <LogOut size={25} />
        </button>
      ) : (
        <div className="size-9.25" />
      )}
      <h1>Pendu</h1>
      <div className="size-9.25" />
    </header>
  );
};

export default Navbar;
