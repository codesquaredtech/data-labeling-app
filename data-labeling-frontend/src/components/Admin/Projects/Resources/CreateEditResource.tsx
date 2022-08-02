import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createResource, getResourcesByProjectId } from "../../../../actions/resource";
import { AppDispatch } from "../../../../config/store";
import { resourcesSliceSelectors } from "../../../../slices/Resources/resourcesSlice";
import Modal from "../../../Global/Modal";

export type ResourceDTO = {
	title: string;
	text: string;
};

export default function CreateEditResource() {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const createLoading = useSelector(resourcesSliceSelectors.createLoading);
	const error = useSelector(resourcesSliceSelectors.error);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ResourceDTO>();
	const { id: projectId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: SubmitHandler<ResourceDTO> = (data) => {
		if (projectId) {
			const onDone = () => {
				dispatch(getResourcesByProjectId(projectId));
				setModalOpen(false);
				reset();
			};
			dispatch(createResource({ id: projectId, submitData: [data], onDone }));
		}
	};

	return (
		<Modal
			open={modalOpen}
			setOpen={setModalOpen}
			name="create-resource"
			buttonTitle="Add resource"
			title="Add resource"
			closeButton
		>
			<>
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
							<input
								{...register("text", { required: true })}
								placeholder="Resource text"
								className={`input input-bordered ${errors.text && "border-error"}`}
								type="text"
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
			</>
		</Modal>
	);
}
