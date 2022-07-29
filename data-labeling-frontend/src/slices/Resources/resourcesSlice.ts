import { getResourcesByProjectId } from "./../../actions/resource";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "resources";

type Resource = {
	_id: string;
	title: string;
	text: string;
	ordinalNumber: number;
};

interface InitState {
	resourceList: [] | Resource[];
	fetchLoading: boolean;
	createLoading: boolean;
	error: any;
}

const initialState: InitState = {
	resourceList: [],
	fetchLoading: false,
	createLoading: false,
	error: null,
};

export const resourcesSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		clearState(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getResourcesByProjectId.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getResourcesByProjectId.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.resourceList = payload;
		});
		builder.addCase(getResourcesByProjectId.rejected, (state, { payload }) => {
			state.fetchLoading = false;
			state.error = payload;
		});
	},
});

export const { clearState } = resourcesSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const resourcesSliceSelectors = {
	fetchLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.fetchLoading;
	},
	createLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.createLoading;
	},

	resourceList: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.resourceList;
	},

	error: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.error;
	},
};
