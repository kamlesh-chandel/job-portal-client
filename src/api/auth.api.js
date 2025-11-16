import axios from "@/config/axiosConfig";

export const registerUser = (data) => {
  return axios.post("/auth/register", data);
};

export const loginUser = (data) => {
    return axios.post("/auth/login", data);
}