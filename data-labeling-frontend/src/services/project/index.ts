import { AddUserDTO, DeleteUserDTO, UpdateProjectDTO } from "./../../actions/project/index";
import axiosInstance from "../../config/api/axios";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";

export const getAllAdminProjectsApi = () => axiosInstance.get("projects");

export const getProjectByIdApi = (id: string) => axiosInstance.get(`projects/${id}`);

export const createProjectApi = (project: Omit<Project, "users" | "metadata">) =>
  axiosInstance.post("projects", project);

export const updateProjectApi = ({ projectId, data }: UpdateProjectDTO) =>
  axiosInstance.put(`projects/${projectId}`, data);

export const getAllUserProjectsApi = () => axiosInstance.get("user/projects");

export const getUsersByProjectIdApi = (id: string) => axiosInstance.get(`projects/${id}/users`);

export const addUsersToProjectApi = ({ projectId, userIds }: AddUserDTO) =>
  axiosInstance.post(`projects/${projectId}/users`, userIds);

export const deleteUserApi = (projectId: string, userId: string) =>
  axiosInstance.delete(`projects/${projectId}/users/${userId}`);
