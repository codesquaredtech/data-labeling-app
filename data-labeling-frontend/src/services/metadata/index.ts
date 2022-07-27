import { Metadata } from "../../components/Admin/Metadata/CreateEditMetadata";
import axiosInstance from "../../config/api/axios";

export const getMetadataByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/metadata`);

export const createMetadataApi = (id: string, metadata: Metadata) =>
	axiosInstance.post(`http://localhost:3030/project/${id}/metadata`, metadata);
