import { DeleteResourceDTO } from "../../actions/resource";
import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResource";
import axiosInstance from "../../config/api/axios";

export const getResourcesByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/resources`);

export const createResourceApi = (id: string, data: ResourceDTO[]) =>
	axiosInstance.post(`http://localhost:3030/project/${id}/resource`, data);

export const deleteResourceApi = (data: DeleteResourceDTO) =>
	axiosInstance.post("http://localhost:3030/project/remove-resource", data);
