import { getResourcesByProjectId, getProjectCurrentPage, getLabelingData, labelData } from "./../../actions/resource";
import { RootState } from "../../config/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "../../components/User/LabelDataForm/Field";

const SLICE_NAME = "resources";

export type Resource = {
  _id: string;
  title: string;
  text: string;
  ordinalNumber: number;
  outputFields: FormField[];
};

type LabelingData = {
  fields: FormField[];
  ordinalNumber: number;
  projectId: string;
  text: string;
  title: string;
  totalNumber: number;
};

interface InitState {
  resourceList: [] | Resource[];
  editResource: Resource | null;
  fetchLoading: boolean;
  createLoading: boolean;
  projectCurrentPage: number | null;
  labelingData: null | LabelingData;
  labelingDataLoading: boolean;
  labelingInProgress: boolean;
  labelingResources: any[];
  outputFields: any[];
  error: any;
}

const initialState: InitState = {
  resourceList: [],
  editResource: null,
  fetchLoading: false,
  createLoading: false,
  projectCurrentPage: null,
  labelingData: null,
  labelingDataLoading: false,
  labelingInProgress: false,
  labelingResources: [],
  outputFields: [],
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
    builder.addCase(getProjectCurrentPage.pending, (state) => {
      state.labelingDataLoading = true;
    });
    builder.addCase(getProjectCurrentPage.fulfilled, (state, { payload }) => {
      state.labelingDataLoading = false;
      state.projectCurrentPage = payload.page || 1;
      state.labelingResources = payload.resources;
      state.outputFields = payload.metadata;
    });
    builder.addCase(getProjectCurrentPage.rejected, (state) => {
      state.labelingDataLoading = false;
    });
    builder.addCase(getLabelingData.fulfilled, (state, { payload }: PayloadAction<LabelingData>) => {
      state.labelingData = payload;
    });
    builder.addCase(labelData.pending, (state) => {
      state.labelingInProgress = true;
    });
    builder.addCase(labelData.fulfilled, (state, { payload }: PayloadAction<number>) => {
      state.labelingInProgress = false;
      state.projectCurrentPage = payload;
    });
    builder.addCase(labelData.rejected, (state) => {
      state.labelingInProgress = false;
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
  projectCurrentPage: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.projectCurrentPage;
  },
  labelingInProgress: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.labelingInProgress;
  },
  labelingData: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.labelingData;
  },
  labelingResources: (rootState: RootState) => getAppState(rootState).labelingResources,
  labelingFields: (rootState: RootState) => getAppState(rootState).outputFields,
  labelingDataLoading: (rootState: RootState) => getAppState(rootState).labelingDataLoading,
  error: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.error;
  },
};
