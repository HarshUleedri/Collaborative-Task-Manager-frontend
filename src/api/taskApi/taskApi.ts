import type { TaskCreateDataType, TaskUpdateDataType } from "@/types/usertypes";
import { axiosInstance } from "../apiconfig";

export const getUserRelatedTask = async () => {
  try {
    const res = await axiosInstance.get("/task");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};

export const getAllTask = async () => {
  try {
    const res = await axiosInstance.get("/task/all");
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
export const createTaskApi = async (data: TaskCreateDataType) => {
  try {
    const res = await axiosInstance.post("/task/create", data);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
export const getSingleTaskApi = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/task/single/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};

export const updateStatusApi = async (id: string, data: TaskUpdateDataType) => {
  try {
    const res = await axiosInstance.put(`/task/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
export const deleteTaskApi = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/task/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
