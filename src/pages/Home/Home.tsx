import { useUserTask } from "@/hooks/useTask";
import { useAuthStore } from "@/store/useAuthStore";
import type { TaskDataType } from "@/types/usertypes";
import TaskCard from "../Dashboard/components/TaskCard";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const { user } = useAuthStore((state) => state);
  const { data } = useUserTask();
  const userTask: TaskDataType[] = data?.tasks;

  const filteredList = userTask
    ?.filter((item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((item) => {
      if (filterStatus === "All") return true;
      return item.status === filterStatus;
    });

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
        <div className="flex  items-center justify-between my-6">
          <div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"outline"} className="space-x-1">
                  <Filter />
                  <span>{filterStatus.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["All", "To Do", "In Progress", "Done"].map((item, idx) => (
                  <div
                    onClick={() => setFilterStatus(item)}
                    className=" px-4 py-1 hover:bg-accent rounded font-medium "
                    key={idx}
                  >
                    {item}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredList?.map((item) => (
            <TaskCard role="member" key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
