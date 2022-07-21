import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createProject, getAllProjectsAdmin, getLabelingData, getProjectCurrentPage } from "../../actions/project";
import { AppDispatch } from "../../config/store";
import { projectsSliceSelectors } from "../../slices/Projects/projectsSlice";
import Modal from "../Global/Modal";

export type InitData = {
	title: string;
	description: string;
	users: Array<{ label: string; value: string }>;
};

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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<InitData>();

	const onSubmit: SubmitHandler<InitData> = (data) => {
		const onDone = () => {
			dispatch(getAllProjectsAdmin());
			setOpen(false);
			reset();
		};
		// TODO: implement auto-generated IDs on backend
		const identNumber = (Math.random() + 1).toString(36).substring(7);
		const modifiedData = { ...data, identNumber, users: data.users.map((item) => item.value) };
		dispatch(createProject({ submitData: modifiedData, onDone }));
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
						<div className="flex flex-col gap-2">
							<input
								{...register("title", { required: true })}
								placeholder="Project title"
								className={`input input-bordered ${errors.title && "border-error"}`}
								type="text"
							/>
							{errors.title && <span className="text-xs text-error">This field is required</span>}
						</div>
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
