import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createProject, getAllAdminProjects, getProjectById, updateProject } from "../../../actions/project";
import { AppDispatch } from "../../../config/store";
import { projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
import { Metadata } from "../../../slices/Metadata/metadataSlice";

export type InitData = {
  title: string;
  description: string;
};

export type Project = {
  identNumber: string;
  title: string;
  description: string;
  users: string[];
  metadata: Metadata[];
};

export default function CreateEditProjectForm({ onDone }: { onDone: () => void }) {
  const { title, description } = useSelector(projectsSliceSelectors.project) || {};
  const createLoading = useSelector(projectsSliceSelectors.createLoading);
  const error = useSelector(projectsSliceSelectors.error);
  const dispatch = useDispatch<AppDispatch>();
  const { id: projectId } = useParams();

  const initialValues = {
    title: title || "",
    description: description || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InitData>({
    defaultValues: initialValues,
  });

  const onCreate: SubmitHandler<InitData> = (data) => {
    const onDoneHandler = () => {
      dispatch(getAllAdminProjects());
      if (onDone) onDone();
      reset();
    };
    // TODO: implement auto-generated IDs on backend
    const identNumber = (Math.random() + 1).toString(36).substring(7);
    const modifiedData = { ...data, identNumber };
    dispatch(createProject({ submitData: modifiedData, onDone: onDoneHandler }));
  };

  const onEdit: SubmitHandler<InitData> = (data) => {
    if (!projectId) return;

    const onDoneHandler = () => {
      dispatch(getProjectById(projectId));
      if (onDone) onDone();
      reset();
    };
    // TODO: implement auto-generated IDs on backend
    dispatch(updateProject({ submitData: { projectId, data }, onDone: onDoneHandler }));
  };

  useEffect(() => {
    return () => {
      reset({ title: "", description: "" });
    };
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(title !== undefined ? onEdit : onCreate)}>
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <input
            {...register("title", { required: true })}
            placeholder="Project title"
            className={`input input-bordered ${errors.title && "border-error"}`}
            type="text"
          />
          {errors.title && <span className="text-xs text-error">This field is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className={`textarea textarea-bordered ${errors.description && "border-error"}`}
          />
          {errors.description && <span className="text-xs text-error">This field is required</span>}
        </div>
      </div>
      {error && <span className="text-xs text-error mt-4 mb-2">{error.message}</span>}
      <input
        disabled={createLoading}
        className={`btn btn-success w-full ${createLoading && "loading"}`}
        type="submit"
      />
    </form>
  );
}
