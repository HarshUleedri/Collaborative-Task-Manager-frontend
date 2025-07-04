import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSingleTask, useUpdateTaskStatus } from "@/hooks/useTask";
import { useAuthStore } from "@/store/useAuthStore";
import type { TaskDataType, TaskUpdateDataType } from "@/types/usertypes";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type StatusType = "TO DO" | "In Progress" | "Done";

const statusArr: StatusType[] = ["TO DO", "In Progress", "Done"];

const UpdateTaskForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  //hook

  const { id } = useParams();
  const taskId = id || "";

  const { mutateAsync, isPending, error } = useUpdateTaskStatus(taskId);
  const { data } = useSingleTask(taskId);
  const { user } = useAuthStore((state) => state);

  const singleTaskData: TaskDataType = data?.task;
  console.log(singleTaskData);
  const [status, setStatus] = useState<StatusType>(singleTaskData?.status);
  const [formData, setFormData] = useState<TaskUpdateDataType>({
    title: "",
    description: "",
    assignedTo: "",
    status: "",
  });

  useEffect(() => {
    setFormData({
      title: singleTaskData?.title,
      description: singleTaskData?.description,
      assignedTo: singleTaskData?.assignedTo,
      status: singleTaskData?.status,
    });
  }, [singleTaskData]);

  const navigate = useNavigate();

  //helper function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await mutateAsync(formData);
    if (res?.success) {
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "",
      });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className=" border max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ">
          <div className="text-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Task is Updated Successfully!
            </h2>
          </div>
          <Button
            className=" w-full "
            onClick={() => {
              navigate(`/${user?.role.trim().toLocaleLowerCase()}`, {
                replace: true,
              });
              setIsSubmitted(false);
            }}
            variant={"outline"}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold tracking-tight">Update Task</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">
              Title <span className="text-destructive">*</span>
            </span>
            <Input
              type="text"
              value={formData.title}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, title: e.target.value }))
              // }
              placeholder="Enter your full name"
              required
            />
          </Label>
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">
              Description <span className="text-destructive">*</span>
            </span>
            <Textarea
              value={formData.description}
              // onChange={(e) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     description: e.target.value,
              //   }))
              // }
              placeholder="Enter Task Description"
              required
            />
          </Label>
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">
              Assign To <span className="text-destructive">*</span>
            </span>
            <Input
              type="text"
              value={formData.assignedTo}
              // onChange={(e) =>
              //   setFormData((prev) => ({ ...prev, assignedTo: e.target.value }))
              // }
              placeholder="Enter your full name"
              required
            />
          </Label>
          <div className="flex items-center gap-2">
            {statusArr.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Badge
                  onClick={() => {
                    setStatus(item);
                    setFormData((prev) => ({ ...prev, status: item }));
                  }}
                  variant={status === item ? "default" : "outline"}
                  className="
                text-sm px-4 flex items-center gap-2"
                >
                  {status === item ? <CheckCircle /> : null}
                  {item.toLowerCase()}
                </Badge>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">
              {error && (error as any)?.response?.data?.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="space-x-4">
          <Button variant={"outline"} onClick={() => navigate("/manager")}>
            Cancel
          </Button>
          <Button disabled={isPending}>
            {isPending ? (
              <div className="size-6 rounded-full border-3 border-muted-foreground/50 border-t-primary animate-spin bg-transparent"></div>
            ) : (
              "Update Task"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UpdateTaskForm;
