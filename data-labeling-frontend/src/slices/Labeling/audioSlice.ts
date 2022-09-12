import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "audioLabeling";

interface InitState {
	regions: any[];
}

const initialState: InitState = {
	regions: [],
};

export const audioLabelingSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setRegions: (state, action) => {
			state.regions = action.payload;
		},
		addRegion: (state, action) => {
			state.regions = [...state.regions, action.payload];
		},
		clearState(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {},
});

export const { addRegion, clearState, setRegions } = audioLabelingSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const audioLabelingSliceSelectors = {
	regions: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.regions;
	},
};
