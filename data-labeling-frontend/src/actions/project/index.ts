import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/Projects/CreateEditProject";
import {
	createProjectApi,
	getAllProjectsAdminApi,
	getAllProjectsUserApi,
	getLabelingDataApi,
	getProjectCurrentPageApi,
	labelDataApi,
} from "./../../services/project/index";

type CreateProjectPayload = {
	submitData: Project;
	onDone: () => void;
};

export type GetProjectByIdPayload = {
	id: string;
	resourceNumber: number;
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

export const getAllProjectsAdmin = createAsyncThunk(
	"projects/getAllProjectsAdmin",
	async (_props, { rejectWithValue }) => {
		try {
			const { data } = await getAllProjectsAdminApi();
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const getAllProjectsUser = createAsyncThunk(
	"projects/getAllProjectsUser",
	async (_props, { rejectWithValue }) => {
		try {
			const { data } = await getAllProjectsUserApi();
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
