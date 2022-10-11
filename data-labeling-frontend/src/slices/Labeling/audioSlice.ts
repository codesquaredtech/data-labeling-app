import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { AudioLabel } from "../../components/Global/AudioPlayer/AudioLabelingPage";

const SLICE_NAME = "audioLabeling";

export enum SortOrder {
	CREATED_ASC = "CREATED_ASC",
	CREATED_DESC = "CREATED_DESC",
	START_ASC = "START_ASC",
	START_DESC = "START_DESC",
}

interface InitState {
	regions: any[];
	activeLabel: AudioLabel | null;
	isPlaying: boolean;
	sortOrder: string;
}

const initialState: InitState = {
	regions: [],
	activeLabel: null,
	isPlaying: false,
	sortOrder: SortOrder.CREATED_ASC,
};

export const audioLabelingSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		addRegion: (state, action) => {
			state.regions.push(action.payload);
		},
		updateRegion: (state, action) => {
			state.regions = state.regions.map((region) => {
				if (region.id === action.payload.id) {
					return { ...action.payload, color: region.color, createdAt: region.createdAt };
				}
				return region;
			});
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
		setSortOrder: (state, action) => {
			state.sortOrder = action.payload;
			state.regions = state.regions.sort((a, b) => {
				switch (state.sortOrder) {
					case SortOrder.CREATED_ASC:
						return a.createdAt - b.createdAt;
					case SortOrder.CREATED_DESC:
						return b.createdAt - a.createdAt;
					case SortOrder.START_ASC:
						return a.start - b.start;
					case SortOrder.START_DESC:
						return b.start - a.start;
					default:
						return 0;
				}
			});
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

export const {
	addRegion,
	removeRegion,
	updateRegion,
	setRegions,
	setActiveLabel,
	setIsPlaying,
	setSortOrder,
	clearState,
} = audioLabelingSlice.actions;

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
	sortOrder: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.sortOrder;
	},
};
