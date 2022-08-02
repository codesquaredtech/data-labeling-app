import axiosInstance from "../../config/api/axios";

export const getMeApi = () => axiosInstance.get("http://localhost:3030/user/my-info");
