import { axiosInstance } from "../apiconfig";

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("/user");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
