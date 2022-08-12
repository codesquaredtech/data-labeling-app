import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";
import {
	addUsersToProjectApi,
	createProjectApi,
	deleteUserApi,
	getAllAdminProjectsApi,
	getAllUserProjectsApi,
	getLabelingDataApi,
	getProjectByIdApi,
	getProjectCurrentPageApi,
	getUsersByProjectIdApi,
	labelDataApi,
	updateProjectApi,
} from "./../../services/project/index";

type CreateProjectPayload = {
	submitData: Omit<Project, "users">;
	onDone: () => void;
};

export type UpdateProjectDTO = {
	data: Pick<Project, "title" | "description">;
	projectId: string;
};

type UpdateProjectPayload = {
	submitData: UpdateProjectDTO;
	onDone: () => void;
};

export type GetProjectByIdPayload = {
	id: string;
	resourceNumber: number;
};

export type DeleteUserDTO = {
	projectId: string;
	userId: string;
};

export type DeleteUserPayload = {
	data: DeleteUserDTO;
	onDone: () => void;
};

export type AddUserDTO = {
	projectId: string;
	userIds: string[];
};

export type AddUserPayload = {
	submitData: AddUserDTO;
	onDone: () => void;
};

export const createProject = createAsyncThunk(
	"projects/create",
	async ({ submitData, onDone }: CreateProjectPayload, { rejectWithValue }) => {
		try {
			const { data } = await createProjectApi(submitData);
			if (onDone) {
				onDone();
			}
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err);
		}
	},
);

export const updateProject = createAsyncThunk(
	`projects/update`,
	async ({ submitData, onDone }: UpdateProjectPayload, { rejectWithValue }) => {
		try {
			const { data } = await updateProjectApi(submitData);
			if (onDone) {
				onDone();
			}
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err);
		}
	},
);

export const getAllAdminProjects = createAsyncThunk(
	"projects/getAllAdminProjects",
	async (_props, { rejectWithValue }) => {
		try {
			const { data } = await getAllAdminProjectsApi();
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const getAllUserProjects = createAsyncThunk(
	"projects/getAllUserProjects",
	async (_props, { rejectWithValue }) => {
		try {
			const { data } = await getAllUserProjectsApi();
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const getProjectCurrentPage = createAsyncThunk(
	"projects/getProjectCurrentPage",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await getProjectCurrentPageApi(id);
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const getLabelingData = createAsyncThunk(
	"projects/getLabelingData",
	async (params: GetProjectByIdPayload, { rejectWithValue }) => {
		try {
			const { data } = await getLabelingDataApi(params);
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const labelData = createAsyncThunk(
	"projects/labelData",
	async ({ submitData, onDone }: any, { rejectWithValue }) => {
		try {
			const { data } = await labelDataApi(submitData);
			if (onDone) {
				onDone();
			}
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const getProjectById = createAsyncThunk("projects/getProjectById", async (id: string, { rejectWithValue }) => {
	try {
		const { data } = await getProjectByIdApi(id);
		return data;
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const getUsersByProjectId = createAsyncThunk(
	"projects/getUsersByProjectId",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await getUsersByProjectIdApi(id);
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const addUsersToProject = createAsyncThunk(
	"projects/addUsersToProject",
	async ({ submitData, onDone }: AddUserPayload, { rejectWithValue }) => {
		try {
			await addUsersToProjectApi(submitData);
			if (onDone) {
				onDone();
			}
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const deleteUser = createAsyncThunk(
	"projects/deleteUser",
	async ({ data, onDone }: DeleteUserPayload, { rejectWithValue }) => {
		try {
			await deleteUserApi(data);
			if (onDone) {
				onDone();
			}
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err);
		}
	},
);
