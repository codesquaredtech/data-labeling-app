import { updateMetadataApi } from "./../../services/metadata/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Metadata } from "../../components/Admin/Projects/Metadata/CreateEditMetadataForm";
import { createMetadataApi, deleteMetadataApi, getMetadataByProjectIdApi } from "./../../services/metadata";

export type CreateMetadataPayload = {
  id: string;
  submitData: Metadata;
  onDone: () => void;
};

export type DeleteMetadataDTO = {
  projectId: string;
  metadataId: string;
};

export type DeleteMetadataPayload = {
  data: DeleteMetadataDTO;
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
  async ({ id, submitData, onDone }: CreateMetadataPayload, { rejectWithValue }) => {
    try {
      const { data } = await createMetadataApi(id, submitData);
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
  async ({ id, submitData, onDone }: CreateMetadataPayload, { rejectWithValue }) => {
    try {
      const { data } = await updateMetadataApi(id, submitData);
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
  async ({ data, onDone }: DeleteMetadataPayload, { rejectWithValue }) => {
    try {
      await deleteMetadataApi(data);
      if (onDone) {
        onDone();
      }
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);
