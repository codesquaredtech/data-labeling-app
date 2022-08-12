import { AddUserDTO, DeleteUserDTO, GetProjectByIdPayload, UpdateProjectDTO } from "./../../actions/project/index";
import axiosInstance from "../../config/api/axios";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";

export const createProjectApi = (project: Omit<Project, "users">) =>
	axiosInstance.post("http://localhost:3030/project", project);

export const updateProjectApi = ({ projectId, data }: UpdateProjectDTO) =>
	axiosInstance.post(`http://localhost:3030/project/${projectId}/update`, data);

export const getAllAdminProjectsApi = () => axiosInstance.get("http://localhost:3030/project/all");

export const getAllUserProjectsApi = () => axiosInstance.get("http://localhost:3030/user/projects");

export const getProjectCurrentPageApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/current-page`);

export const getProjectByIdApi = (id: string) => axiosInstance.get(`http://localhost:3030/project/${id}`);

export const getUsersByProjectIdApi = (id: string) => axiosInstance.get(`http://localhost:3030/project/${id}/users`);

export const getLabelingDataApi = ({ id, resourceNumber }: GetProjectByIdPayload) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/label-project/${resourceNumber}`);

export const labelDataApi = ({ id, labelingData }: any) =>
	axiosInstance.post(`http://localhost:3030/project/${id}/data-accept`, labelingData);

export const addUsersToProjectApi = ({ projectId, userIds }: AddUserDTO) =>
	axiosInstance.post(`http://localhost:3030/project/${projectId}/add-users`, userIds);

export const deleteUserApi = (data: DeleteUserDTO) =>
	axiosInstance.post("http://localhost:3030/project/remove-user", data);
