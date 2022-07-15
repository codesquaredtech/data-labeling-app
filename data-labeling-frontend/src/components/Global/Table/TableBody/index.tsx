import React from "react";
import { TablePropsBody } from "../types";
import "./styles/tableBody.scss";

const TableBody = ({ getTableBodyProps, prepareRow, page }: TablePropsBody) => {
	return (
		<div {...getTableBodyProps()} className="body">
			{page.map((row) => {
				prepareRow(row);
				return (
					<div {...row.getRowProps()} className="tr">
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
