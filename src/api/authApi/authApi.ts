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
export const signupApi = async (data: {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}) => {
  try {
    const res = await axiosInstance.post("auth/signup", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("auth/login", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const res = await axiosInstance.post("auth/logout");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await axiosInstance.get("auth/me");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};

export const uploadImage = async (data: FormData) => {
  try {
    const res = await axiosInstance.post("/upload/image", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error at login api ", error);
    throw error;
  }
};
