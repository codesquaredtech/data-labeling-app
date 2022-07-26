import axiosInstance from "../../config/api/axios";

export const getMetadataByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/metadata`);
