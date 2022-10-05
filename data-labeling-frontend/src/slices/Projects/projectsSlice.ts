import {
  getProjectById,
  getUsersByProjectId,
  getAllAdminProjects,
  getAllUserProjects,
  createProject,
  updateProject,
} from "../../actions/project";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../components/Admin/Projects/CreateEditProjectForm";
import { createMetadata, deleteMetadata, updateMetadata } from "../../actions/metadata";

const SLICE_NAME = "projects";

interface InitState {
  projects: Project[];
  project: Project | null;
  projectUsers: any[];
  fetchLoading: boolean;
  createLoading: boolean;
  // TODO: change this
  error: any;
}

const initialState: InitState = {
  projects: [],
  project: null,
  projectUsers: [],
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
    builder.addCase(getUsersByProjectId.fulfilled, (state, { payload }) => {
      state.projectUsers = payload;
    });
    builder.addMatcher(
      (action) =>
        [
          getProjectById.fulfilled.type,
          updateProject.fulfilled.type,
          createMetadata.fulfilled.type,
          updateMetadata.fulfilled.type,
          deleteMetadata.fulfilled.type,
        ].includes(action.type),
      (state, { payload }) => {
        state.project = payload;
      },
    );
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
  projectMetadata: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.project?.metadata?.filter((md) => typeof md !== "string") || [];
  },
  projectUsers: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.projectUsers;
  },
};
