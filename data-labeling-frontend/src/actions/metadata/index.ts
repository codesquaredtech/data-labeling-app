import { updateMetadataApi } from "./../../services/metadata/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Metadata } from "../../components/Admin/Projects/Metadata/CreateEditMetadataForm";
import { createMetadataApi, deleteMetadataApi, getMetadataByProjectIdApi } from "./../../services/metadata";

export type CreateMetadataPayload = {
  projectId: string;
  submitData: Metadata;
  onDone: () => void;
};

export type UpdateMetadataPayload = CreateMetadataPayload & {
  id: string;
};

export type DeleteMetadataDTO = {
  projectId: string;
  metadataId: string;
};

export type DeleteMetadataPayload = DeleteMetadataDTO & {
  onDone: () => void;
};

export const getMetadataByProjectId = createAsyncThunk(
  "metadata/getMetadataByProjectId",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await getMetadataByProjectIdApi(id);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const createMetadata = createAsyncThunk(
  "metadata/create",
  async ({ projectId, submitData, onDone }: CreateMetadataPayload, { rejectWithValue }) => {
    try {
      const { data } = await createMetadataApi(projectId, submitData);
      if (onDone) {
        onDone();
      }
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const updateMetadata = createAsyncThunk(
  "metadata/update",
  async ({ projectId, id, submitData, onDone }: UpdateMetadataPayload, { rejectWithValue }) => {
    try {
      const { data } = await updateMetadataApi(projectId, id, submitData);
      if (onDone) {
        onDone();
      }
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const deleteMetadata = createAsyncThunk(
  "metadata/deleteMetadata",
  async ({ projectId, metadataId, onDone }: DeleteMetadataPayload, { rejectWithValue }) => {
    try {
      const { data } = await deleteMetadataApi(projectId, metadataId);
      if (onDone) {
        onDone();
      }
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);
