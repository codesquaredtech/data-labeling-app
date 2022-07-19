import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersApi } from "../../services/admin/user";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (_props, { rejectWithValue }) => {
	try {
		const { data } = await getAllUsersApi();
		return data;
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});
