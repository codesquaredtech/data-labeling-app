import React from "react";
import Popover from "../../../Popover";
import { Alignment, Direction } from "../../../Popover/types";
import TableCheckbox from "../../TableCheckbox";
import { ColumnSelectorProps } from "../../types";
import "./styles/columnSelector.scss";

const ColumnSelector = ({ allColumns, getToggleHideAllColumnsProps }: ColumnSelectorProps) => {
	return (
		<Popover
			direction={Direction.Left}
			align={Alignment.Start}
			content={
				<div>
					<div className="column-selector-title">Add or remove columns</div>
					<div key="toggle-all">
						<div className="column-selector-row">
							<TableCheckbox {...getToggleHideAllColumnsProps()} />{" "}
							<div className="column-selector-name">Toggle All</div>
						</div>
					</div>
					{allColumns.map((column) => {
						return column.id !== "selection" ? (
							<div key={column.id}>
								<div className="column-selector-row">
									<TableCheckbox {...column.getToggleHiddenProps()} />{" "}
									<div className="column-selector-name">{column.Header}</div>
								</div>
							</div>
						) : null;
					})}
				</div>
			}
		>
			<button className="btn btn-primary btn-sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-layout-three-columns"
					viewBox="0 0 16 16"
				>
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1H1.5zM10 15V1H6v14h4zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11v14z" />
				</svg>
			</button>
		</Popover>
	);
};

export default ColumnSelector;
