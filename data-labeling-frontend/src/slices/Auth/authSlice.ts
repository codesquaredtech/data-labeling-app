import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils";
import { login, logout } from "../../actions/auth";

const SLICE_NAME = "auth";

interface InitState {
	token: string | null;
	loading: boolean;
	// TODO: implement user type
	user: any;
}

const initialState: InitState = {
	token: getToken() || null,
	loading: false,
	user: null,
};

export const authSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			const { user, token } = payload;
			state.loading = false;
			state.token = token || null;
			state.user = user;
			if (token) localStorage.setItem("jwt-token", token);
		});
		builder.addCase(login.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem("jwt-token");
		});
	},
});

export const {} = authSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const authSliceSelectors = {
	loading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.loading;
	},
	user: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.user;
	},
	token: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.token;
	},
};
