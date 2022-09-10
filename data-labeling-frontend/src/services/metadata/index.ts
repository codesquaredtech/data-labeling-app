import axiosInstance from "../../config/api/axios";
import { Metadata } from "../../components/Admin/Projects/Metadata/CreateEditMetadataForm";
import { DeleteMetadataDTO } from "../../actions/metadata";

export const getMetadataByProjectIdApi = (id: string) => axiosInstance.get(`project/${id}/metadata`);

export const createMetadataApi = (id: string, metadata: Metadata) =>
  axiosInstance.post(`project/${id}/metadata`, metadata);

export const updateMetadataApi = (id: string, metadata: Metadata) =>
  axiosInstance.post(`project/metadata/${id}/update`, metadata);

export const deleteMetadataApi = (data: DeleteMetadataDTO) => axiosInstance.post("project/remove-metadata", data);
