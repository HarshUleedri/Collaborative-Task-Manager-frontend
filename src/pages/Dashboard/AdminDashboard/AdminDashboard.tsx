import Navbar from "@/components/common/Navbar";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  ChartColumn,
  ClipboardCheck,
  FolderKanban,
  Plus,
  UserPenIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const navTab = [
  { number: 1, title: "Tasks Overview", icon: ClipboardCheck },
  { number: 2, title: "Profile", icon: UserPenIcon },
  { number: 3, title: "Members", icon: Users },
  { number: 4, title: "Projects", icon: FolderKanban },
  { number: 5, title: "Analytics", icon: ChartColumn },
];

const AdminDashboard = () => {
  const [isActive, setIsActive] = useState<number>(1);

  const { isAuthenticated, user } = useAuthStore((state) => state);

  const navigate = useNavigate();
  if (!isAuthenticated || user?.role !== "Admin") {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Navbar />

      <div className="flex">
        <aside className="w-72 hidden lg:block border-r h-screen p-4">
          <div className="space-y-2 ">
            {navTab.map((item) => (
              <div
                onClick={() => {
                  setIsActive(item.number);
                  navigate(
                    `${item.title.trim().replace(" ", "-").toLowerCase()}`
                  );
                }}
                key={item.number}
                className={`flex items-center gap-2 py-2 hover:bg-muted rounded-md px-4 group ${
                  isActive === item.number &&
                  "text-accent   bg-accent-foreground"
                } `}
              >
                <span className="group-hover:text-primary  ">
                  <item.icon className="size-5" />
                </span>
                <span className="text-base font-medium  group-hover:text-primary">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </aside>
        <main className="p-8 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-0 lg:items-center ">
            <h2 className=" text-2xl lg:text-3xl tracking-tight font-semibold">
              Welcome Back Admin
            </h2>
            <Button
              onClick={() => navigate("/admin/create")}
              className="flex items-center gap-2  lg:text-lg"
            >
              <Plus />
              Create Task
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
