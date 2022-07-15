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
			<button className="btn btn-outline btn-primary">Toggle</button>
		</Popover>
	);
};

export default ColumnSelector;
