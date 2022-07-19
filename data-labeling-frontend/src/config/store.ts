import { projectsSlice } from "./../slices/Projects/projectsSlice";
import { usersSlice } from "./../slices/Admin/usersSlice";
import { authSlice } from "./../slices/Auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	users: usersSlice.reducer,
	projects: projectsSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
