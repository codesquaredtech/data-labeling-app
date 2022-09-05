import { getMe } from "./../../actions/auth/index";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils";
import { login, logout } from "../../actions/auth";

const SLICE_NAME = "auth";

interface InitState {
	token: string | null;
	loading: boolean;
	isAdmin?: boolean;
	// TODO: implement user type
	user: any;
}

const initialState: InitState = {
	token: getToken() || null,
	loading: false,
	isAdmin: undefined,
	user: null,
};

export const authSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			const { user, token } = payload;
			state.loading = false;
			state.token = token || null;
			state.user = user;
			if (token) localStorage.setItem("jwt-token", token);
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.token = null;
			state.user = null;
			state.isAdmin = undefined;
			localStorage.removeItem("jwt-token");
		});
		builder.addCase(getMe.fulfilled, (state, { payload }) => {
			state.user = payload;
			state.loading = false;
			state.isAdmin = payload.isAdmin;
		});
		builder.addMatcher((action) => [login.pending.type, getMe.pending.type].includes(action.type),
		(state) => {
			state.loading = true;
		});
		builder.addMatcher((action) => [login.rejected.type, getMe.rejected.type].includes(action.type),
		(state) => {
			state.loading = false;
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
	isAdmin: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.isAdmin;
	},
};
