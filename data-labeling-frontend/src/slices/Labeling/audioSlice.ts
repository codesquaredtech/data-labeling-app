import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { AudioLabel } from "../../components/Global/AudioPlayer/AudioLabelingPage";

const SLICE_NAME = "audioLabeling";

interface InitState {
	regions: any[];
	activeLabel: AudioLabel | null;
	isPlaying: boolean;
}

const initialState: InitState = {
	regions: [],
	activeLabel: null,
	isPlaying: false,
};

export const audioLabelingSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		addRegion: (state, action) => {
			state.regions = [...state.regions.filter((region) => region.id !== action.payload.id), action.payload];
		},
		removeRegion: (state, action) => {
			state.regions = state.regions.filter((region) => region.id !== action.payload);
		},
		setRegions: (state, action) => {
			state.regions = action.payload;
		},
		setActiveLabel: (state, action) => {
			state.activeLabel = action.payload;
		},
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
		clearState(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {},
});

export const { addRegion, removeRegion, setRegions, setActiveLabel, setIsPlaying, clearState } =
	audioLabelingSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const audioLabelingSliceSelectors = {
	regions: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.regions;
	},
	activeLabel: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.activeLabel;
	},
	isPlaying: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.isPlaying;
	},
};
