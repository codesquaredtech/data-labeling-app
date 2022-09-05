import axiosInstance from "../../config/api/axios";

export const getAllUsersApi = () => axiosInstance.get("user/all");
