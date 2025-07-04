import { useAllTask } from "@/hooks/useTask";
import type { TaskDataType } from "@/types/usertypes";

import TaskCard from "./TaskCard";

const TaskOverview = () => {
  const { data } = useAllTask();
  const allTasks: TaskDataType[] = data?.tasks;

  console.log(allTasks);

  if (allTasks?.length === 0) {
    return <div className="text-2xl mt-4">No task is present</div>;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {allTasks?.map((item) => (
        <TaskCard role="manager" key={item._id} data={item} />
      ))}
    </div>
  );
};

export default TaskOverview;
