import axiosInstance from "../../config/api/axios";

export const getResourcesByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/resources`);
