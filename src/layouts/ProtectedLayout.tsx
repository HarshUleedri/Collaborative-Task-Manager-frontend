import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore((state) => state);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
