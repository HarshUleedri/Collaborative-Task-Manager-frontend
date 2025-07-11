import {
  createTaskApi,
  deleteTaskApi,
  getAllTask,
  getSingleTaskApi,
  getUserRelatedTask,
  updateStatusApi,
} from "@/api/taskApi/taskApi";
import type { TaskCreateDataType, TaskUpdateDataType } from "@/types/usertypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserTask = () => {
  return useQuery({
    queryKey: ["user tasks"],
    queryFn: getUserRelatedTask,
  });
};

export const useAllTask = () => {
  return useQuery({
    queryKey: ["all tasks"],
    queryFn: getAllTask,
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (data: TaskCreateDataType) => createTaskApi(data),
  });
};
export const useSingleTask = (id: string) => {
  return useQuery({
    queryKey: ["single tasks"],
    queryFn: () => getSingleTaskApi(id),
    enabled: !!id,
  });
};
export const useUpdateTaskStatus = (id: string) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskUpdateDataType) => updateStatusApi(id, data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["all tasks"] });
    },
  });
};

export const useDeleteTask = (id: string) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTaskApi(id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["all tasks"] });
    },
  });
};
