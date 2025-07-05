import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteTask } from "@/hooks/useTask";
import type { TaskDataType } from "@/types/usertypes";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router";
interface TaskCardPropType {
  data: TaskDataType;
  role: "Manager" | "Member" | "Admin";
}

const TaskCard = ({ data, role }: TaskCardPropType) => {
  const navigate = useNavigate();

  const { mutate } = useDeleteTask(data._id);

  const handleDelete = () => {
    mutate();
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-2 lg:space-y-4">
          <div className="flex items-center justify-between ">
            <h3 className="text-xl font-semibold break-words">{data.title}</h3>
            {role !== "Member" && (
              <Button
                onClick={() => navigate(`/${role}/task/${data._id}`)}
                variant={"ghost"}
                size={"sm"}
              >
                <SquarePen className="text-muted-foreground size-5" />
              </Button>
            )}
          </div>
          <div className="text-base text-muted-foreground/80 font-medium ">
            {data.description}
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex gap-4 items-center">
              <div className="size-12  border rounded-full p-1">
                <img
                  className="size-full rounded-full"
                  src={
                    data.assignedToUserId.profilePic ||
                    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg"
                  }
                  alt="profile"
                />
              </div>
              <div className="text-base font-medium">
                {data.assignedToUserId.username}
              </div>
            </div>

            <Badge
              variant={
                data.status === "TO DO"
                  ? "outline"
                  : data.status === "In Progress"
                  ? "secondary"
                  : data.status === "Done"
                  ? "default"
                  : undefined
              }
            >
              {data.status}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-base font-medium">Created At:</span>
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) || ""}
            </div>
            {role === "Admin" && (
              <Button
                className="py-1 h-6 cursor-pointer text-xs "
                size={"sm"}
                variant={"destructive"}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
