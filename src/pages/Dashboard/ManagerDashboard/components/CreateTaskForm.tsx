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
import { useCreateTask } from "@/hooks/useTask";
import type { TaskCreateDataType } from "@/types/usertypes";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateTaskForm = () => {
  const [formData, setFormData] = useState<TaskCreateDataType>({
    title: "",
    description: "",
    assignedTo: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  //hook

  const { mutateAsync, isPending, error } = useCreateTask();

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
              Task is Created Successfully!
            </h2>
          </div>
          <Button
            className=" w-full "
            onClick={() => {
              navigate("/manager", { replace: true });
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
          <h3 className="text-2xl font-semibold tracking-tight">
            Create New Task
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">
              Title <span className="text-destructive">*</span>
            </span>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, assignedTo: e.target.value }))
              }
              placeholder="Enter your full name"
              required
            />
          </Label>
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
              "Create Task"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateTaskForm;
