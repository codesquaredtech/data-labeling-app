import { GetProjectByIdPayload } from "./../../actions/project/index";
import axiosInstance from "../../config/api/axios";
import { Project } from "../../components/Admin/CreateEditProject";

export const createProjectApi = (project: Project) => axiosInstance.post("http://localhost:3030/project", project);

export const getAllProjectsAdminApi = () => axiosInstance.get("http://localhost:3030/project/all");

export const getAllProjectsUserApi = () => axiosInstance.get("http://localhost:3030/user/projects");

export const getProjectCurrentPageApi = (id: string) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/current-page`);

export const getLabelingDataApi = ({ id, resourceNumber }: GetProjectByIdPayload) =>
	axiosInstance.get(`http://localhost:3030/project/${id}/label-project/${resourceNumber}`);
