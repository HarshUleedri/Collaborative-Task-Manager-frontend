import { useUserTask } from "@/hooks/useTask";
import { useAuthStore } from "@/store/useAuthStore";
import type { TaskDataType } from "@/types/usertypes";
import TaskCard from "../Dashboard/ManagerDashboard/components/TaskCard";

const Home = () => {
  const { user } = useAuthStore((state) => state);
  const { data } = useUserTask();
  const userTask: TaskDataType[] = data?.tasks;

  return (
    <div className="">
      <div>
        {user?.role === "Member" && (
          <h2 className="text-3xl tracking-tight font-semibold">
            Welcome Back {user?.username}
          </h2>
        )}
        {user?.role === "Manager" && (
          <h2 className="text-3xl tracking-tight font-semibold">
            Welcome Back Manager
          </h2>
        )}
        {user?.role === "Admin" && (
          <h2 className="text-3xl tracking-tight font-semibold">
            Welcome Back Admin
          </h2>
        )}
      </div>

      <div className="w-full">
        {
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {userTask?.map((item) => (
              <TaskCard role="member" key={item._id} data={item} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
