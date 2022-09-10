import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import axiosInstance from "../../config/api/axios";
import { GetProjectByIdPayload } from "../../actions/resource";

export const getResourcesByProjectIdApi = (projectId: string) => axiosInstance.get(`resource/${projectId}/all`);

export const createResourceApi = (projectId: string, data: ResourceDTO[]) =>
  axiosInstance.post(`resource/${projectId}/create`, data);

export const updateResourceApi = (resourceId: string, submitData: { data: ResourceDTO; projectId: string }) =>
  axiosInstance.post(`resource/${resourceId}/update`, submitData);

export const deleteResourceApi = (resourceId: string, projectId: string) =>
  axiosInstance.post(`resource/${resourceId}/remove`, { projectId });

export const getProjectCurrentPageApi = (id: string) => axiosInstance.get(`resource/${id}/current-page`);

export const getLabelingDataApi = ({ id, resourceNumber }: GetProjectByIdPayload) =>
  axiosInstance.get(`resource/${id}/label-project/${resourceNumber}`);

export const labelDataApi = ({ id, labelingData }: any) =>
  axiosInstance.post(`resource/${id}/data-accept`, labelingData);
