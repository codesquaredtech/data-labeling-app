import { AddUserDTO, DeleteUserDTO, UpdateProjectDTO } from "./../../actions/project/index";
import axiosInstance from "../../config/api/axios";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";

export const createProjectApi = (project: Omit<Project, "users">) => axiosInstance.post("project", project);

export const updateProjectApi = ({ projectId, data }: UpdateProjectDTO) =>
  axiosInstance.post(`project/${projectId}/update`, data);

export const getAllAdminProjectsApi = () => axiosInstance.get("project/all");

export const getAllUserProjectsApi = () => axiosInstance.get("user/projects");

export const getProjectByIdApi = (id: string) => axiosInstance.get(`project/${id}`);

export const getUsersByProjectIdApi = (id: string) => axiosInstance.get(`project/${id}/users`);

export const addUsersToProjectApi = ({ projectId, userIds }: AddUserDTO) =>
  axiosInstance.post(`project/${projectId}/add-users`, userIds);

export const deleteUserApi = (data: DeleteUserDTO) => axiosInstance.post("project/remove-user", data);
