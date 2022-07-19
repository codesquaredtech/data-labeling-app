import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/admin/user";
import { createProject } from "../../actions/project";
import { AppDispatch } from "../../config/store";
import { clearState, usersSliceSelectors } from "../../slices/Admin/usersSlice";
import { projectsSliceSelectors } from "../../slices/Projects/projectsSlice";
import Modal from "../Global/Modal";

export type Project = {
	title: string;
	description: string;
	users: string[];
};

export default function CreateEditProject() {
	const users = useSelector(usersSliceSelectors.users);
	const createLoading = useSelector(projectsSliceSelectors.createLoading);
	const error = useSelector(projectsSliceSelectors.error);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Project>();

	const onSubmit: SubmitHandler<Project> = (data) => {
		dispatch(createProject(data));
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
		<Modal name="create-project" buttonTitle="Add project" title="Add project" closeButton>
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
						<input
							{...register("description")}
							placeholder="Description"
							className="textarea textarea-bordered"
							type="text"
						/>
						<div className="flex flex-col gap-2">
							<select
								{...register("users")}
								defaultValue="default"
								className="select select-primary w-full"
							>
								<option disabled value="default">
									Select user
								</option>
								{users?.length > 0 ? (
									users.map((user: any) => {
										return (
											<option value={user._id} key={user.uuid}>
												{user.firstname} {user.lastname}
											</option>
										);
									})
								) : (
									<option disabled>No options available</option>
								)}
							</select>
						</div>
					</div>
					{error && <span className="text-xs text-error mt-4 mb-2">This field is required</span>}
					<input
						disabled={createLoading}
						className={`btn btn-primary w-full ${createLoading && "loading"}`}
						type="submit"
					/>
				</form>
			</>
		</Modal>
	);
}
