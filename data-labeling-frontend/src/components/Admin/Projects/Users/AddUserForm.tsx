import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getAllUsers } from "../../../../actions/admin/user";
import { AppDispatch } from "../../../../config/store";
import { clearState, usersSliceSelectors } from "../../../../slices/Admin/usersSlice";
import { projectsSliceSelectors } from "../../../../slices/Projects/projectsSlice";
import Modal from "../../../Global/Modal";
import { addUsersToProject, getUsersByProjectId } from "../../../../actions/project";
import { useParams } from "react-router-dom";

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

export default function AddUserForm({ onDone }: { onDone?: () => void }) {
	const { users: currentUsers } = useSelector(projectsSliceSelectors.project) || {};
	const users = useSelector(usersSliceSelectors.users).filter((user) => !currentUsers?.includes(user._id));
	const options =
		users.length > 0 ? users.map((user) => ({ value: user._id, label: `${user.firstname} ${user.lastname}` })) : [];
	const createLoading = useSelector(projectsSliceSelectors.createLoading);
	const error = useSelector(projectsSliceSelectors.error);
	const { id: projectId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const { handleSubmit, reset, control } = useForm<InitData>();

	const onSubmit: SubmitHandler<InitData> = (data) => {
		if (!projectId) return;

		const onDoneHandler = () => {
			dispatch(getUsersByProjectId(projectId));
			if (onDone) {
				onDone();
			}
			reset();
		};
		const userIds = data.users.map((item) => item.value);
		dispatch(addUsersToProject({ submitData: { projectId, userIds }, onDone: onDoneHandler }));
	};

	useEffect(() => {
		dispatch(getAllUsers());
		return () => {
			dispatch(clearState());
			reset();
		};
	}, [dispatch, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-3 mb-8">
				<div className="flex flex-col">
					<Controller
						name="users"
						control={control}
						render={({ field }) => (
							<Select {...field} options={options} isMulti noOptionsMessage={() => "No users found"} />
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
	);
}
