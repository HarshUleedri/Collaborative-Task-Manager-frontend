import { axiosInstance } from "../apiconfig";

export const testApi = async () => {
  try {
    const res = await axiosInstance.get("/testing");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
//-----
export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("/login", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
