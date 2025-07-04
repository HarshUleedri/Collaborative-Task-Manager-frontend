import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import MemberDashboard from "@/pages/Dashboard/MemberDashboard/MemberDashboard";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  console.log(user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isAuthenticated && user?.role === "Member") {
    return (
      <MemberDashboard>
        <Outlet />
      </MemberDashboard>
    );
  }
  if (isAuthenticated && user?.role === "Manager") {
    return <Navigate to={"/manager"} />;
  }
  if (isAuthenticated && user?.role === "Admin") {
    return <AdminDashboard />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
