import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLabelingData, getProjectCurrentPage, labelData } from "../../../actions/resource";
import { AppDispatch } from "../../../config/store";
import { projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
import { resourcesSliceSelectors } from "../../../slices/Resources/resourcesSlice";
import Modal from "../../Global/Modal";
import { Field } from "./Field";

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
	const createLoading = useSelector(projectsSliceSelectors.createLoading);
	const projectCurrentPage = useSelector(resourcesSliceSelectors.projectCurrentPage);
	const labelingData = useSelector(resourcesSliceSelectors.labelingData);
	const { fields: reduxFields } = labelingData || {};
	const dispatch = useDispatch<AppDispatch>();

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { fields, append } = useFieldArray({
		control,

		name: "labelDataForm", // unique name for your Field Array
	});

	useEffect(() => {
		// first we fetch current page, then we fetch labeling data
		if (projectId) {
			if (!projectCurrentPage) {
				dispatch(getProjectCurrentPage(projectId));
			} else {
				dispatch(getLabelingData({ id: projectId, resourceNumber: projectCurrentPage }));
			}
		}
	}, [dispatch, projectCurrentPage, projectId]);

	useEffect(() => {
		// upon receiving labeling data we append form fields
		if (reduxFields && reduxFields.length > 0) {
			reduxFields.forEach((field) => {
				append({ [field.name]: field.value || "" });
			});
		}
	}, [append, reduxFields]);

	const onSubmit: SubmitHandler<any> = (data) => {
		const modifiedFields = reduxFields?.map((field, i) => ({
			...field,
			value: data.labelDataForm[i][field.name],
		}));

		const modifiedLabelingData = { ...labelingData, fields: modifiedFields };

		const onDone = () => {
			setOpen(false);
			reset();
		};
		dispatch(labelData({ submitData: { id: projectId, labelingData: modifiedLabelingData }, onDone }));
	};

	return (
		<Modal open={open} setOpen={setOpen} name="label-data" title="Label data" closeButton hideButton>
			<>
				<div className="font-bold flex justify-center mt-2 mb-4">{labelingData?.title || "Resource title"}</div>
				<div className="mt-2 mb-4">{labelingData?.text || ""}</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-3 mb-8">
						{fields && fields.length > 0
							? fields.map((item, i) => (
									<Field
										key={item.id}
										field={reduxFields && reduxFields[i] ? reduxFields[i] : null}
										index={i}
										register={register}
										errors={errors}
									/>
							  ))
							: "No labeling data."}
					</div>
					<input
						disabled={createLoading}
						className={`btn btn-success w-full ${createLoading && "loading"}`}
						type="submit"
					/>
				</form>
			</>
		</Modal>
	);
}
