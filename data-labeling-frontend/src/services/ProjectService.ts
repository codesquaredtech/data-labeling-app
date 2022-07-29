// import { ResourceTemplate } from "../pages/AddResourcePage";
import LabelingAxiosClient from "../config/api/axios";

export const ProjectService = {
	getProjects,
	getProjectById,
	getMetadataByProject,
	getUsersByProject,
	addMetadataToProject,
	removeMetadata,
	removeUser,
	getLabelingData,
	getProjectsByUser,
	getProjectResources,
	addResource,
};

async function getProjects() {
	return await LabelingAxiosClient.get("http://localhost:3030/project/all");
}

async function getProjectById(id: string | undefined) {
	return await LabelingAxiosClient.get(`http://localhost:3030/project/${id}`);
}

async function getMetadataByProject(id: any) {
	return await LabelingAxiosClient.get("http://localhost:3030/project/" + id + "/metadata");
}

async function getUsersByProject(id: any) {
	return await LabelingAxiosClient.get("http://localhost:3030/project/" + id + "/users");
}

async function addMetadataToProject(id: any, metadata: any) {
	return await LabelingAxiosClient.post(`http://localhost:3030/project/${id}/metadata`, metadata);
}

async function removeMetadata(removedto: any) {
	return await LabelingAxiosClient.post("http://localhost:3030/project/remove-metadata", removedto);
}

async function removeUser(removedto: any) {
	return await LabelingAxiosClient.post("http://localhost:3030/project/remove-user", removedto);
}

async function getLabelingData(id: string | undefined, resourceNumber: number) {
	return await LabelingAxiosClient.get(`http://localhost:3030/project/${id}/label-project/${resourceNumber}`);
}

async function getProjectsByUser() {
	return await LabelingAxiosClient.get("http://localhost:3030/project/user-project");
}

async function getProjectResources(id: string | undefined) {
	return await LabelingAxiosClient.get(`http://localhost:3030/project/${id}/resources`);
}

async function addResource(id: string | undefined, body: any[]) {
	return await LabelingAxiosClient.post(`http://localhost:3030/project/${id}/resource`, body);
}
