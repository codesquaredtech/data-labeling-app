import { FormField } from "./../../components/User/LabelDataForm/Field";
import { getLabelingData, getProjectById, getUsersByProjectId } from "./../../actions/project/index";
import { getAllAdminProjects, getAllUserProjects, createProject, getProjectCurrentPage } from "../../actions/project";
import { RootState } from "../../config/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";

const SLICE_NAME = "projects";

type LabelingData = {
	fields: FormField[];
	ordinalNumber: number;
	projectId: string;
	text: string;
	title: string;
	totalNumber: number;
};
interface InitState {
	projects: Project[];
	project: Project | null;
	projectUsers: any[];
	fetchLoading: boolean;
	createLoading: boolean;
	projectCurrentPage: null;
	labelingData: null | LabelingData;
	// TODO: change this
	error: any;
}

const initialState: InitState = {
	projects: [],
	project: null,
	projectUsers: [],
	fetchLoading: false,
	createLoading: false,
	projectCurrentPage: null,
	labelingData: null,
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
		builder.addCase(getAllUserProjects.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getAllUserProjects.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.projects = payload;
		});
		builder.addCase(getAllUserProjects.rejected, (state) => {
			state.fetchLoading = false;
		});
		builder.addCase(getAllAdminProjects.pending, (state) => {
			state.fetchLoading = true;
		});
		builder.addCase(getAllAdminProjects.fulfilled, (state, { payload }) => {
			state.fetchLoading = false;
			state.projects = payload;
		});
		builder.addCase(getAllAdminProjects.rejected, (state) => {
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
		builder.addCase(getProjectCurrentPage.fulfilled, (state, { payload }) => {
			state.projectCurrentPage = payload.page;
		});
		builder.addCase(getLabelingData.fulfilled, (state, { payload }: PayloadAction<LabelingData>) => {
			state.labelingData = payload;
		});
		builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
			state.project = payload;
		});
		builder.addCase(getUsersByProjectId.fulfilled, (state, { payload }) => {
			state.projectUsers = payload;
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
	project: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.project;
	},
	projectCurrentPage: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.projectCurrentPage;
	},
	labelingData: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.labelingData;
	},
	projectUsers: (rootState: RootState) => {
		const appState = getAppState(rootState);
		return appState.projectUsers;
	},
};
