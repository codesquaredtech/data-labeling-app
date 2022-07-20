import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/CreateEditProject";
import { createProjectApi, getAllProjectsAdminApi, getAllProjectsUserApi } from "./../../services/project/index";

type createProjectPayload = {
	submitData: Project;
	onDone: () => void;
};

export const createProject = createAsyncThunk(
	"projects/create",
	async ({ submitData, onDone }: createProjectPayload, { rejectWithValue }) => {
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
