import { updateResourceApi } from "./../../services/resource/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import { createResourceApi, deleteResourceApi, getResourcesByProjectIdApi } from "./../../services/resource";

export type CreateResourcePayload = {
	id: string;
	submitData: ResourceDTO[];
	onDone: () => void;
};

export type UpdateResourcePayload = {
	resourceId: string;
	submitData: { data: ResourceDTO; projectId: string };
	onDone: () => void;
};

export type DeleteResourcePayload = {
	resourceId: string;
	projectId: string;
	onDone: () => void;
};

export const getResourcesByProjectId = createAsyncThunk(
	"resources/getResourcesByProjectId",
	async (projectId: string, { rejectWithValue }) => {
		try {
			const { data } = await getResourcesByProjectIdApi(projectId);
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const createResource = createAsyncThunk(
	"resources/create",
	async ({ id, submitData, onDone }: CreateResourcePayload, { rejectWithValue }) => {
		try {
			const { data } = await createResourceApi(id, submitData);
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

export const updateResource = createAsyncThunk(
	"resources/update",
	async ({ resourceId, submitData, onDone }: UpdateResourcePayload, { rejectWithValue }) => {
		try {
			const { data } = await updateResourceApi(resourceId, submitData);
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

export const deleteResource = createAsyncThunk(
	"resources/delete",
	async ({ resourceId, projectId, onDone }: DeleteResourcePayload, { rejectWithValue }) => {
		try {
			await deleteResourceApi(resourceId, projectId);
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
