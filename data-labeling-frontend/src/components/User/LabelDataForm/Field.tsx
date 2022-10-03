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
  register: UseFormRegister<any>;
  errors: FieldErrorsImpl<DeepRequired<any>>;
};

export interface Key {
  key: number;
}

export const Field = ({ field, register, errors }: FieldProps) => {
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
                {...register(name)}
                type="text"
                className={`input w-full input-bordered ${errors[name] ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors[name]?.message}</div>
            </>
          )}
        </div>
      );
    case "number":
      return (
        <div className="form-group">
          {name && (
            <>
              <label className="label">
                <span className="label-text">{name}</span>
              </label>
              <input
                {...register(name)}
                type="number"
                className={`input w-full input-bordered ${errors[name] ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors[name]?.message}</div>
            </>
          )}
        </div>
      );
    case "boolean":
      return (
        <div className="form-group">
          {name && (
            <>
              <label className="label">
                <span className="label-text">{name}</span>
              </label>
              <input
                {...register(name)}
                type="checkbox"
                className={`checkbox checkbox-primary${errors[name] ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors[name]?.message}</div>
            </>
          )}
        </div>
      );

    default:
      return <>Undefined field</>;
  }
};
