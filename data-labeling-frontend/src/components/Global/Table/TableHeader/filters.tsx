import React from "react";
import { FiltersProps } from "../types";

export const Filter = ({ column }: FiltersProps) => {
	return <div style={{ marginTop: 5 }}>{column.canFilter && column.render("Filter")}</div>;
};

export const DefaultColumnFilter = ({ column }: FiltersProps) => {
	return <input type="text" placeholder="Search..." id={`${column.Header}-id`} className="input w-full max-w-xs" />;
};
