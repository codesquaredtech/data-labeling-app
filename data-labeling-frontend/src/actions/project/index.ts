import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProjectApi, getAllProjectsApi } from "./../../services/project/index";
import { Project } from "../../components/Admin/CreateEditProject";

export const createProject = createAsyncThunk("projects/create", async (project: Project, { rejectWithValue }) => {
	try {
		const { data } = await createProjectApi(project);
		return data;
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const getAllProjects = createAsyncThunk("projects/getAllProjects", async (_props, { rejectWithValue }) => {
	try {
		const { data } = await getAllProjectsApi();
		return data;
	} catch (err: any) {
		console.log("err", err);
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});
