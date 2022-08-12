import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import axiosInstance from "../../config/api/axios";

export const getResourcesByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/resources`);

export const createResourceApi = (id: string, data: ResourceDTO[]) =>
	axiosInstance.post(`http://localhost:3030/project/${id}/resource`, data);

export const updateResourceApi = (id: string, data: ResourceDTO) =>
	axiosInstance.post(`http://localhost:3030/project/resource/${id}/update`, data);

export const deleteResourceApi = (resourceId: string) =>
	axiosInstance.post("http://localhost:3030/project/remove-resource", { resourceId });
