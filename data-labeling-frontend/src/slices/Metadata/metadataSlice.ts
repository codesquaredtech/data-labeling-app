import { createMetadata, getMetadataByProjectId } from "./../../actions/metadata/index";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "metadata";

type Metadata = {
	_id: string;
	name: string;
	type: string;
	value: string | boolean;
};

interface InitState {
	metadataList: [] | Metadata[];
	editMetadata: Metadata | null;
	fetchLoading: boolean;
	createLoading: boolean;
	error: any;
}

const initialState: InitState = {
	metadataList: [],
	editMetadata: null,
	fetchLoading: false,
	createLoading: false,
	error: null,
};

export const metadataSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setEditMetadata: (state, action) => {
			state.editMetadata = action.payload;
		},
		clearState(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMetadataByProjectId.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getMetadataByProjectId.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.metadataList = payload;
		});
		builder.addCase(getMetadataByProjectId.rejected, (state) => {
			state.fetchLoading = false;
		});
		builder.addCase(createMetadata.pending, (state) => {
			state.createLoading = true;
		});
		builder.addCase(createMetadata.fulfilled, (state) => {
			state.createLoading = false;
		});
		builder.addCase(createMetadata.rejected, (state, { payload }) => {
			state.createLoading = false;
			state.error = payload;
		});
	},
});

export const { clearState, setEditMetadata } = metadataSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const metadataSliceSelectors = {
	fetchLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.fetchLoading;
	},
	createLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.createLoading;
	},

	metadataList: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.metadataList;
	},
	editMetadata: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.editMetadata;
	},
	error: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.error;
	},
};
