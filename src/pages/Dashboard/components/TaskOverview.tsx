import { useAllTask } from "@/hooks/useTask";
import type { TaskDataType } from "@/types/usertypes";

import TaskCard from "./TaskCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const TaskOverview = () => {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const { data } = useAllTask();
  const allTasks: TaskDataType[] = data?.tasks;

  console.log(allTasks);

  if (allTasks?.length === 0) {
    return <div className="text-2xl mt-4">No task is present</div>;
  }

  const filteredList = allTasks
    ?.filter((item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((item) => {
      if (filterStatus === "All") return true;
      return item.status === filterStatus;
    });

  return (
    <div>
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
        {filteredList
          ?.filter((item) =>
            item.title
              .trim()
              .toLowerCase()
              .includes(search.trim().toLowerCase())
          )
          .map((item) => (
            <TaskCard role="Manager" key={item._id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default TaskOverview;
