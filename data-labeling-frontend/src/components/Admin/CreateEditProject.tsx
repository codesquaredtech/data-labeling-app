import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../Global/Modal";

type Inputs = {
	title: string;
	description: string;
	// TODO: implement type
	user: any;
};

export default function CreateEditProject() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	useEffect(() => {
		return () => reset();
	}, [reset]);

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
								{...(register("user"), { required: true })}
								defaultValue="default"
								className="select select-primary w-full"
							>
								<option disabled value="default">
									Select user
								</option>
								{[
									{ name: "Jack", id: 1 },
									{ name: "Alex", id: 2 },
								].map((user: any) => {
									return (
										<option value={user.id} key={user.id}>
											{user.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<input className="btn btn-primary w-full" type="submit" />
				</form>
			</>
		</Modal>
	);
}
