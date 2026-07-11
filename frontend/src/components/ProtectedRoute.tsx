import { Navigate, Outlet } from "react-router";
import { useHangmanStore } from "../store/hangmanStore.ts";

const ProtectedRoute = () => {
  const isConnected = useHangmanStore(s => s.isConnected);

  return <>{isConnected ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoute;
