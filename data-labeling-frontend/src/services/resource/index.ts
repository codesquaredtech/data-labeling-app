import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import axiosInstance from "../../config/api/axios";

export const getResourcesByProjectIdApi = (projectId: string) =>
	axiosInstance.get(`http://localhost:3030/resource/${projectId}/all`);

export const createResourceApi = (projectId: string, data: ResourceDTO[]) =>
	axiosInstance.post(`http://localhost:3030/resource/${projectId}/create`, data);

export const updateResourceApi = (resourceId: string, submitData: { data: ResourceDTO; projectId: string }) =>
	axiosInstance.post(`http://localhost:3030/resource/${resourceId}/update`, submitData);

export const deleteResourceApi = (resourceId: string, projectId: string) =>
	axiosInstance.post(`http://localhost:3030/resource/${resourceId}/remove`, { projectId });

export const uploadResourceApi = (projectId: string, data: FormData) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};
	return axiosInstance.post(`http://localhost:3030/resource/${projectId}/upload`, data, config);
};
