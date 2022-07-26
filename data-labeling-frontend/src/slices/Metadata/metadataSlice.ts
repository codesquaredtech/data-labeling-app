import { getMetadataByProjectId } from "./../../actions/metadata/index";
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
	fetchLoading: boolean;
	createLoading: boolean;
}

const initialState: InitState = {
	metadataList: [],
	fetchLoading: false,
	createLoading: false,
};

export const metadataSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
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
	},
});

export const { clearState } = metadataSlice.actions;

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
};
