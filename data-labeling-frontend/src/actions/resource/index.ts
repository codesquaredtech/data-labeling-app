import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResourceDTO } from "../../components/Admin/Projects/Resources/CreateEditResourceForm";
import { createResourceApi, deleteResourceApi, getResourcesByProjectIdApi } from "./../../services/resource";

export type CreateResourcePayload = {
	id: string;
	submitData: ResourceDTO[];
	onDone: () => void;
};

export type DeleteResourceDTO = {
	projectId: string;
	resourceId: string;
};

export type DeleteResourcePayload = {
	data: DeleteResourceDTO;
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
	"resources/createResource",
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

export const deleteResource = createAsyncThunk(
	"resources/deleteResource",
	async ({ data, onDone }: DeleteResourcePayload, { rejectWithValue }) => {
		try {
			await deleteResourceApi(data);
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
