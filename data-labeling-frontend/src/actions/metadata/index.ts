import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMetadataByProjectIdApi } from "./../../services/metadata";

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
