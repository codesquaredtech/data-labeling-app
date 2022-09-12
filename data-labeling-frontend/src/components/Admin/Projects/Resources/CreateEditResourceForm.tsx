import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createResource, getResourcesByProjectId, updateResource } from "../../../../actions/resource";
import { AppDispatch } from "../../../../config/store";
import { resourcesSliceSelectors, setEditResource } from "../../../../slices/Resources/resourcesSlice";

export type ResourceDTO = {
  title: string;
  text: string;
};

export default function CreateEditResourceForm({ onDone }: { onDone: () => void }) {
  const editResource = useSelector(resourcesSliceSelectors.editResource);
  const {
    _id: resourceId,
    title,
    text,
  } = useMemo(() => {
    if (!editResource) return { title: "", text: "", _id: "" };
    return editResource;
  }, [editResource]);
  const createLoading = useSelector(resourcesSliceSelectors.createLoading);
  const error = useSelector(resourcesSliceSelectors.error);
  const { id: projectId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    title,
    text,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResourceDTO>({ defaultValues: initialValues });

  const onSubmit: SubmitHandler<ResourceDTO> = (data) => {
    if (!projectId) return;

    const onDoneHandler = () => {
      dispatch(getResourcesByProjectId(projectId));
      if (onDone) onDone();
      reset();
    };
    if (editResource) {
      dispatch(updateResource({ resourceId, submitData: { data, projectId }, onDone: onDoneHandler }));
    } else {
      dispatch(createResource({ id: projectId, submitData: [data], onDone: onDoneHandler }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setEditResource(null));
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <input
            {...register("title", { required: true })}
            placeholder="Resource title"
            className={`input input-bordered ${errors.title && "border-error"}`}
            type="text"
          />
          {errors.title && <span className="text-xs text-error">This field is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            {...register("text", { required: true })}
            placeholder="Resource text"
            className={`textarea textarea-bordered ${errors.text && "border-error"}`}
          />
          {errors.text && <span className="text-xs text-error">This field is required</span>}
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
