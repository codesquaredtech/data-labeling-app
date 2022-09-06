import axiosInstance from "../../config/api/axios";

export const getMeApi = () => axiosInstance.get("user/my-info");
