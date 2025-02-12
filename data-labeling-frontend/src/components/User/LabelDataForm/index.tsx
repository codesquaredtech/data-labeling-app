import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCurrentPage, labelData } from "../../../actions/resource";
import { AppDispatch } from "../../../config/store";
import { projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
import { Resource, resourcesSliceSelectors } from "../../../slices/Resources/resourcesSlice";
import Modal from "../../Global/Modal";
import { Field } from "./Field";
import LoadingSpinner from "../../Global/LoadingSpinner";
import { Size } from "../../Global/LoadingSpinner/types";

export type Project = {
  identNumber: string;
  title: string;
  description: string;
  users: string[];
};

type LabelDataProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId?: string | null;
};

export default function LabelData({ projectId, open, setOpen }: LabelDataProps) {
  const projectCurrentPage = useSelector(resourcesSliceSelectors.projectCurrentPage);
  const labelingResources = useSelector(resourcesSliceSelectors.labelingResources);
  const labelingFields = useSelector(resourcesSliceSelectors.labelingFields);
  const labelingDataLoading = useSelector(resourcesSliceSelectors.labelingDataLoading);
  const labelingInProgress = useSelector(resourcesSliceSelectors.labelingInProgress);
  const dispatch = useDispatch<AppDispatch>();

  const [currentResourceNumber, setCurrentResourceNumber] = useState(projectCurrentPage || 1);

  const currentResource: Resource = labelingResources.find((r) => r.ordinalNumber === currentResourceNumber) || {};
  const reduxFields = currentResource.outputFields?.length > 0 ? currentResource.outputFields : labelingFields;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (projectCurrentPage) {
      setCurrentResourceNumber(projectCurrentPage || 1);
    }
    if (projectId && !projectCurrentPage) {
      dispatch(getProjectCurrentPage(projectId));
    }
  }, [dispatch, projectCurrentPage, projectId]);

  useEffect(() => {
    if (reduxFields && reduxFields.length > 0) {
      const formValues = reduxFields.reduce((form, field) => ({ ...form, [field.name]: field.value || "" }), {});
      reset(formValues);
    }
  }, [reset, reduxFields]);

  const onSubmit: SubmitHandler<any> = (data) => {
    const modifiedFields = reduxFields?.map((field, i) => ({
      ...field,
      value: data[field.name],
    }));

    const modifiedLabelingData = { ...currentResource, fields: modifiedFields };

    const onDone = () => {
      if (currentResourceNumber === labelingResources.length) {
        setOpen(false);
      }
      reset();
    };
    dispatch(labelData({ submitData: { id: projectId, labelingData: modifiedLabelingData }, onDone }));
  };

  const getResourceClassNames = (ordinalNumber: number) => {
    const classNames = [];
    if (!projectCurrentPage) return [];

    if (ordinalNumber === currentResourceNumber) {
      classNames.push("font-bold");
      classNames.push("cursor-pointer");
    }
    if (ordinalNumber > projectCurrentPage) {
      classNames.push("text-gray-400");
    } else if (ordinalNumber < projectCurrentPage || projectCurrentPage === labelingResources.length) {
      classNames.push("text-green-600");
      classNames.push("cursor-pointer");
    }
    return classNames;
  };

  const resourceClickFunction = (ordinalNumber: number) => {
    if (!projectCurrentPage || ordinalNumber > projectCurrentPage) return;

    setCurrentResourceNumber(ordinalNumber);
    reset();
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      name="label-data"
      title="Label data"
      closeButton
      hideButton
      preventClickOutside
    >
      {labelingDataLoading || !projectCurrentPage ? (
        <LoadingSpinner size={Size.XL} />
      ) : (
        <div className={"flex flex-row"}>
          <div className={"w-64"}>
            <ul>
              {labelingResources.map((r) => {
                return (
                  <li
                    key={r.ordinalNumber}
                    className={getResourceClassNames(r.ordinalNumber).join(" ")}
                    onClick={() => resourceClickFunction(r.ordinalNumber)}
                  >
                    {r.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={"flex-1 min-w-0"}>
            <div className="font-bold flex justify-center mt-2 mb-4">{currentResource.title || "Resource title"}</div>
            <div className="mt-2 mb-4">{currentResource.text || ""}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 mb-8">
                {reduxFields && reduxFields.length > 0
                  ? reduxFields.map((item) => (
                      <Field key={item.name} field={item} register={register} errors={errors} />
                    ))
                  : "No labeling data."}
              </div>
              {labelingResources.length > 0 && (
                <input
                  disabled={labelingInProgress}
                  className={`btn btn-success w-full ${labelingInProgress && "loading"}`}
                  type="submit"
                />
              )}
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
}
