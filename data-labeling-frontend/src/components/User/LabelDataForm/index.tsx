import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createProject, getAllProjectsAdmin, getLabelingData, getProjectCurrentPage } from "../../../actions/project";
import { AppDispatch } from "../../../config/store";
import { projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
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
	const projectCurrentPage = useSelector(projectsSliceSelectors.projectCurrentPage);
	const { fields: reduxFields } = useSelector(projectsSliceSelectors.labelingData) || {};

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
		if (reduxFields && reduxFields.length > 0) {
			reduxFields.forEach((field) => {
				append({ [field.name]: field.value || "" });
			});
		}
	}, [append, reduxFields]);

	const onSubmit: SubmitHandler<any> = (data) => {
		console.log("data", data);
		const onDone = () => {
			dispatch(getAllProjectsAdmin());
			setOpen(false);
			reset();
		};
	};

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (projectId) {
			if (!projectCurrentPage) {
				dispatch(getProjectCurrentPage(projectId));
			} else {
				dispatch(getLabelingData({ id: projectId, resourceNumber: projectCurrentPage }));
			}
		}
	}, [dispatch, projectCurrentPage, projectId]);

	return (
		<Modal open={open} setOpen={setOpen} name="label-data" title="Label data" closeButton hideButton>
			<>
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
