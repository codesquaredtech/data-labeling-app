import axiosInstance from "../../config/api/axios";
import { Metadata } from "../../components/Admin/Projects/Metadata/CreateEditMetadataForm";

export const getMetadataByProjectIdApi = (id: string) => axiosInstance.get(`projects/${id}/metadata`);

export const createMetadataApi = (projectId: string, metadata: Metadata) =>
  axiosInstance.post(`projects/${projectId}/metadata`, metadata);

export const updateMetadataApi = (projectId: string, id: string, metadata: Metadata) =>
  axiosInstance.put(`projects/${projectId}/metadata/${id}`, metadata);

export const deleteMetadataApi = (projectId: string, id: string) =>
  axiosInstance.delete(`projects/${projectId}/metadata/${id}`);
