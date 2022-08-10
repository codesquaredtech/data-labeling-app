import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { createMetadata, getMetadataByProjectId } from "../../../../actions/metadata";
import { AppDispatch } from "../../../../config/store";
import { metadataSliceSelectors } from "../../../../slices/Metadata/metadataSlice";
import { MetadataTypes } from "../../../../types/global";
import Modal from "../../../Global/Modal";

type InitData = {
	name: string;
	type: { label: string; value: string };
};

export type Metadata = {
	name: string;
	type: string;
};

export default function CreateEditMetadataForm({ onDone }: { onDone?: () => void }) {
	const options = useMemo<any>(() => {
		return Object.values(MetadataTypes).map((option: string) => ({
			value: option,
			label: option[0].toUpperCase() + option.slice(1),
		}));
	}, []);
	const createLoading = useSelector(metadataSliceSelectors.createLoading);
	const error = useSelector(metadataSliceSelectors.error);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<InitData>();
	const { id: projectId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: SubmitHandler<InitData> = (data) => {
		if (projectId) {
			const onDoneHandler = () => {
				dispatch(getMetadataByProjectId(projectId));
				if (onDone) onDone();
				reset();
			};
			const modifiedData = { ...data, type: data.type.value };
			dispatch(createMetadata({ id: projectId, submitData: modifiedData, onDone: onDoneHandler }));
		}
	};

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
						render={({ field }) => (
							<Select {...field} options={options} noOptionsMessage={() => "No types found"} />
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
