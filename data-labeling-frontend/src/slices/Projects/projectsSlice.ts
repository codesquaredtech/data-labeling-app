import { getAllProjectsAdmin, getAllProjectsUser, createProject } from "../../actions/project";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/CreateEditProject";

const SLICE_NAME = "projects";

interface InitState {
	projects: Project[];
	fetchLoading: boolean;
	createLoading: boolean;
	// TODO: change this
	error: any;
}

const initialState: InitState = {
	projects: [],
	fetchLoading: false,
	createLoading: false,
	error: null,
};

export const projectsSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		clearState(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllProjectsUser.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getAllProjectsUser.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.projects = payload;
		});
		builder.addCase(getAllProjectsUser.rejected, (state) => {
			state.fetchLoading = false;
		});
		builder.addCase(getAllProjectsAdmin.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getAllProjectsAdmin.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.projects = payload;
		});
		builder.addCase(getAllProjectsAdmin.rejected, (state) => {
			state.fetchLoading = false;
		});
		builder.addCase(createProject.pending, (state) => {
			state.createLoading = true;
		});
		builder.addCase(createProject.fulfilled, (state) => {
			state.createLoading = false;
		});
		builder.addCase(createProject.rejected, (state, { payload }) => {
			state.createLoading = false;
			state.error = payload;
		});
	},
});

export const { clearState } = projectsSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const projectsSliceSelectors = {
	fetchLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.fetchLoading;
	},
	createLoading: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.createLoading;
	},
	error: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.error;
	},
	projects: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.projects;
	},
};
