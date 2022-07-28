import axiosInstance from "../../config/api/axios";
import { Metadata } from "../../components/Admin/Metadata/CreateEditMetadata";
import { DeleteMetadataDTO } from "../../actions/metadata";

export const getMetadataByProjectIdApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/metadata`);

export const createMetadataApi = (id: string, metadata: Metadata) =>
	axiosInstance.post(`http://localhost:3030/project/${id}/metadata`, metadata);

export const deleteMetadataApi = (data: DeleteMetadataDTO) =>
	axiosInstance.post("http://localhost:3030/project/remove-metadata", data);
