import React from "react";
import FooterPagination from "./FooterPagination";
import FooterInfo from "./FooterInfo";
import { TableFooterProps } from "../types";
import "./styles/tableFooter.scss";

const TableFooter = ({
	pageOptions,
	footerText,
	currentPage,
	setCurrentPage,
	rowsPerPage,
	setRowsPerPage,
	totalPages,
	pageSizes,
}: TableFooterProps) => {
	return (
		<div className="footer-table flex w-full h-full justify-between align-middle bg-base-300 text-base-content border-0 p-3">
			<FooterInfo footerText={footerText} />
			<FooterPagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setRowsPerPage={setRowsPerPage}
				totalPages={totalPages}
				pageSizes={pageSizes}
			/>
		</div>
	);
};

export default TableFooter;
