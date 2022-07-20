import axiosInstance from "../../config/api/axios";
import { Project } from "../../components/Admin/CreateEditProject";

export const createProjectApi = (project: Project) => axiosInstance.post("http://localhost:3030/project", project);

export const getAllProjectsAdminApi = () => axiosInstance.get("http://localhost:3030/project/all");

export const getAllProjectsUserApi = () => axiosInstance.get("http://localhost:3030/user/projects");
