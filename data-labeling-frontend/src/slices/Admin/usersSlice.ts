import { getAllUsers } from "../../actions/admin/user";
import { RootState } from "../../config/store";
import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "users";

interface InitState {
  // TODO: implement user type
  users: any[];
  loading: boolean;
}

const initialState: InitState = {
  users: [],
  loading: false,
};

export const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearState } = usersSlice.actions;

const getAppState = (state: RootState) => state[SLICE_NAME];

export const usersSliceSelectors = {
  loading: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.loading;
  },
  users: (rootState: RootState) => {
    const appState = getAppState(rootState);
    return appState.users;
  },
};
