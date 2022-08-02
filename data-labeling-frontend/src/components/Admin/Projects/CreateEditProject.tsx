import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getAllUsers } from "../../../actions/admin/user";
import { createProject, getAllProjectsAdmin } from "../../../actions/project";
import { AppDispatch } from "../../../config/store";
import { clearState, usersSliceSelectors } from "../../../slices/Admin/usersSlice";
import { projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
import Modal from "../../Global/Modal";

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

export default function CreateEditProject() {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const users = useSelector(usersSliceSelectors.users);
	const options =
		users.length > 0 ? users.map((user) => ({ value: user._id, label: `${user.firstname} ${user.lastname}` })) : [];
	const createLoading = useSelector(projectsSliceSelectors.createLoading);
	const error = useSelector(projectsSliceSelectors.error);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<InitData>();

	const onSubmit: SubmitHandler<InitData> = (data) => {
		const onDone = () => {
			dispatch(getAllProjectsAdmin());
			setModalOpen(false);
			reset();
		};
		// TODO: implement auto-generated IDs on backend
		const identNumber = (Math.random() + 1).toString(36).substring(7);
		const modifiedData = { ...data, identNumber, users: data.users.map((item) => item.value) };
		dispatch(createProject({ submitData: modifiedData, onDone }));
	};

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllUsers());
		return () => {
			dispatch(clearState());
			reset();
		};
	}, [dispatch, reset]);

	return (
		<Modal
			open={modalOpen}
			setOpen={setModalOpen}
			name="create-project"
			buttonTitle="Add project"
			title="Add project"
			closeButton
		>
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
						<div className="flex flex-col gap-2">
							<textarea
								{...register("description", { required: true })}
								placeholder="Description"
								className={`textarea textarea-bordered ${errors.description && "border-error"}`}
							/>
							{errors.description && <span className="text-xs text-error">This field is required</span>}
						</div>
						<div className="flex flex-col gap-2">
							<Controller
								name="users"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										options={options}
										isMulti
										noOptionsMessage={() => "No users found"}
									/>
								)}
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
			</>
		</Modal>
	);
}
