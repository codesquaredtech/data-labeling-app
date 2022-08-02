import axiosInstance from "../../config/api/axios";

export const getAllUsersApi = () => axiosInstance.get("http://localhost:3030/user/all");
