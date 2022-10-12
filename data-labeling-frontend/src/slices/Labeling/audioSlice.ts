import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { AudioLabel } from "../../components/Global/AudioPlayer/AudioLabelingPage";
import { SortOrder, sortRegions } from "../../components/Global/AudioPlayer/utils";

const SLICE_NAME = "audioLabeling";

export type Region = {
	id: string;
	color: string;
	start: number;
	end: number;
	createdAt: number;
};
interface InitState {
	regions: Region[];
	activeLabel: AudioLabel | null;
	isPlaying: boolean;
	sortOrder: SortOrder;
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
			let preparedRegions: Region[] = [...state.regions, action.payload];
			preparedRegions = sortRegions(preparedRegions, state.sortOrder);
			state.regions = preparedRegions;
		},
		updateRegion: (state, action) => {
			let preparedRegions: Region[] = state.regions.map((region) => {
				if (region.id === action.payload.id) {
					return { ...action.payload, color: region.color, createdAt: region.createdAt };
				}
				return region;
			});
			preparedRegions = sortRegions(preparedRegions, state.sortOrder);
			state.regions = preparedRegions;
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
			state.regions = sortRegions(state.regions, action.payload);
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
