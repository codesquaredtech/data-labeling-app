import { createAsyncThunk } from "@reduxjs/toolkit";
import { getResourcesByProjectIdApi } from "./../../services/resource";

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
