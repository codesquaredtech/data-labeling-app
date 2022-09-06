import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import axiosInstance from "../../config/api/axios";

export const getResourcesByProjectIdApi = (projectId: string) =>
	axiosInstance.get(`resource/${projectId}/all`);

export const createResourceApi = (projectId: string, data: ResourceDTO[]) =>
	axiosInstance.post(`resource/${projectId}/create`, data);

export const updateResourceApi = (resourceId: string, submitData: { data: ResourceDTO; projectId: string }) =>
	axiosInstance.post(`resource/${resourceId}/update`, submitData);

export const deleteResourceApi = (resourceId: string, projectId: string) =>
	axiosInstance.post(`resource/${resourceId}/remove`, { projectId });
