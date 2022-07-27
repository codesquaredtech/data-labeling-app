import { createAsyncThunk } from "@reduxjs/toolkit";
import { Metadata } from "../../components/Admin/Metadata/CreateEditMetadata";
import { createMetadataApi, getMetadataByProjectIdApi } from "./../../services/metadata";

export type CreateMetadataPayload = {
	id: string;
	submitData: Metadata;
	onDone: () => void;
};

export const getMetadataByProjectId = createAsyncThunk(
	"metadata/getMetadataByProjectId",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await getMetadataByProjectIdApi(id);
			return data;
		} catch (err: any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	},
);

export const createMetadata = createAsyncThunk(
	"metadata/create",
	async ({ id, submitData, onDone }: CreateMetadataPayload, { rejectWithValue }) => {
		try {
			const { data } = await createMetadataApi(id, submitData);
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
