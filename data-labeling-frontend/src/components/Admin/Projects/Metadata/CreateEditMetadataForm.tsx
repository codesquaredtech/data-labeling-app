import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { createMetadata, updateMetadata } from "../../../../actions/metadata";
import { AppDispatch } from "../../../../config/store";
import { metadataSliceSelectors, setEditMetadata } from "../../../../slices/Metadata/metadataSlice";
import { MetadataTypes } from "../../../../types/global";

type InitData = {
  name: string;
  type: { label: string; value: string };
};

export type Metadata = {
  _id?: string;
  name: string;
  type: string;
};

export default function CreateEditMetadataForm({ onDone }: { onDone?: () => void }) {
  const editMetadata = useSelector(metadataSliceSelectors.editMetadata);
  const {
    _id: metadataId,
    name,
    type,
  } = useMemo(() => {
    if (!editMetadata) return { name: "", type: { label: "", value: "" }, _id: "" };
    return {
      ...editMetadata,
      type: { label: editMetadata.type[0].toUpperCase() + editMetadata.type.slice(1), value: editMetadata.type },
    };
  }, [editMetadata]);

  const options = useMemo<any>(() => {
    return Object.values(MetadataTypes).map((option: string) => ({
      value: option,
      label: option[0].toUpperCase() + option.slice(1),
    }));
  }, []);
  const createLoading = useSelector(metadataSliceSelectors.createLoading);
  const error = useSelector(metadataSliceSelectors.error);
  const { id: projectId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    name,
    type,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<InitData> = (data) => {
    if (!projectId) return;
    const onDoneHandler = () => {
      if (onDone) onDone();
      reset();
    };
    const modifiedData = { ...data, type: data.type.value };
    if (editMetadata) {
      dispatch(updateMetadata({ projectId, id: metadataId, submitData: modifiedData, onDone: onDoneHandler }));
    } else {
      dispatch(createMetadata({ projectId, submitData: modifiedData, onDone: onDoneHandler }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setEditMetadata(null));
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <input
            {...register("name", { required: true })}
            placeholder="Metadata name"
            className={`input input-bordered ${errors.name && "border-error"}`}
            type="text"
          />
          {errors.name && <span className="text-xs text-error">This field is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Controller
            name="type"
            control={control}
            render={({ field }) => <Select {...field} options={options} noOptionsMessage={() => "No types found"} />}
          />
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
