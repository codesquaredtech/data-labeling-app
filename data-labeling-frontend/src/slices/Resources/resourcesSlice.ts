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
	editResource: Resource | null;
	fetchLoading: boolean;
	createLoading: boolean;
	error: any;
}

const initialState: InitState = {
	resourceList: [],
	editResource: null,
	fetchLoading: false,
	createLoading: false,
	error: null,
};

export const resourcesSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setEditResource: (state, action) => {
			state.editResource = action.payload;
		},
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

export const { clearState, setEditResource } = resourcesSlice.actions;

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
	editResource: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.editResource;
	},
	error: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.error;
	},
};
