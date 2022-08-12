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
	id: string;
	submitData: ResourceDTO;
	onDone: () => void;
};

export type DeleteResourcePayload = {
	resourceId: string;
	onDone: () => void;
};

export const getResourcesByProjectId = createAsyncThunk(
	"resources/getResourcesByProjectId",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await getResourcesByProjectIdApi(id);
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
	async ({ id, submitData, onDone }: UpdateResourcePayload, { rejectWithValue }) => {
		try {
			const { data } = await updateResourceApi(id, submitData);
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
	async ({ resourceId, onDone }: DeleteResourcePayload, { rejectWithValue }) => {
		try {
			await deleteResourceApi(resourceId);
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
