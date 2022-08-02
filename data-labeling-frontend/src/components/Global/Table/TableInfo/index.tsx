import React from "react";
import { TableInfoProps } from "../types";
import ColumnSelector from "./ColumnSelector";

const TableInfo = ({ title, allColumns, getToggleHideAllColumnsProps }: TableInfoProps) => {
	return (
		<div className="flex justify-between align-middle border-0">
			<div className="flex justify-between align-middle">
				{title ? <div className="card-title text-base-content">{title}</div> : null}
			</div>
			<ColumnSelector allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
		</div>
	);
};

export default TableInfo;
