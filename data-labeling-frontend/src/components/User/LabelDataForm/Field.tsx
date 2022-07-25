import React from "react";
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from "react-hook-form";

export type FormField = {
	type: string;
	name: string;
	value: string | boolean;
	_id: string;
};

export type FieldProps = {
	field: FormField | null;
	index: number;
	register: UseFormRegister<any>;
	errors: FieldErrorsImpl<DeepRequired<any>>;
};

export interface Key {
	key: number;
}

export const Field = ({ index, field, register, errors }: FieldProps) => {
	const { type, name } = field ?? {};

	switch (type) {
		case "text":
			return (
				<div className="form-group">
					{name && (
						<>
							<label className="label">
								<span className="label-text">{name}</span>
							</label>
							<input
								{...register(`labelDataForm.${index}.${name}`)}
								type="text"
								className={`input w-full input-bordered ${
									errors.labelDataForm?.[index]?.[name] ? "is-invalid" : ""
								}`}
							/>
							<div className="invalid-feedback">{errors.labelDataForm?.[index]?.[name]?.message}</div>
						</>
					)}
				</div>
			);
		case "checkbox":
			return (
				<div className="form-group">
					{name && (
						<>
							<label className="label">
								<span className="label-text">{name}</span>
							</label>
							<input
								{...register(`labelDataForm.${index}.${name}`)}
								type="checkbox"
								className={`checkbox checkbox-primary${
									errors.labelDataForm?.[index]?.[name] ? "is-invalid" : ""
								}`}
							/>
							<div className="invalid-feedback">{errors.labelDataForm?.[index]?.[name]?.message}</div>
						</>
					)}
				</div>
			);

		default:
			return <>Undefined field</>;
	}
};
