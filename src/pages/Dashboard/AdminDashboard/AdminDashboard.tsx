import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <aside className="w-72 border-r h-screen p-4">{}</aside>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
