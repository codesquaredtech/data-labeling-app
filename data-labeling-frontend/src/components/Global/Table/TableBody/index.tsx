import React from "react";
import { TablePropsBody } from "../types";
import "./styles/tableBody.scss";

const TableBody = ({ getTableBodyProps, prepareRow, page }: TablePropsBody) => {
	return (
		<div {...getTableBodyProps()} className="body overflow-auto">
			{page.map((row) => {
				prepareRow(row);
				return (
					<div
						{...row.getRowProps()}
						className="odd:bg-neutral-focus even:bg-neutral text-neutral-content border-0"
					>
						{row.cells.map((cell) => {
							return (
								<div {...cell.getCellProps()} className="td">
									{cell.render("Cell")}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default TableBody;
