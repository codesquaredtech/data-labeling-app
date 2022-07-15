import React from "react";
import { TableInfoProps } from "../types";
import ColumnSelector from "./ColumnSelector";
import "./styles/tableInfo.scss";

const TableInfo = ({ title, allColumns, getToggleHideAllColumnsProps }: TableInfoProps) => {
	return (
		<div className="container">
			<div className="title-container">{title ? <div className="title">{title}</div> : null}</div>
			<ColumnSelector allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
		</div>
	);
};

export default TableInfo;
