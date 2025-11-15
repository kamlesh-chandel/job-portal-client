import axiosInstance from "@/config/axiosConfig";

export const registerApi = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const loginApi = (data) => {
    return axiosInstance.post("/auth/login", data);
}