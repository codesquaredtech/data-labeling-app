import React from "react";
import { FooterPaginationProps } from "../types";

const FooterPagination = ({
	currentPage,
	setCurrentPage,
	setRowsPerPage,
	totalPages,
	pageSizes,
}: FooterPaginationProps) => {
	const onChangeInInput = (event: any) => {
		const page = event.target.value ? Number(event.target.value) - 1 : 0;
		setCurrentPage(page);
	};

	return (
		<div className="footer-pagination">
			<div className="footer-row">
				<button className="btn btn-circle" onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-double-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
						<path
							fillRule="evenodd"
							d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>
				</button>
				<button
					className="btn btn-circle"
					onClick={() => {
						setCurrentPage(currentPage - 1);
					}}
					disabled={currentPage === 0}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>
				</button>
			</div>
			<div className="footer-page-select">
				Page{" "}
				<strong>
					{currentPage + 1} of {totalPages}
				</strong>
			</div>
			<div className="footer-page-select">
				<input
					onChange={onChangeInInput}
					type="number"
					placeholder="Go to page:"
					className="input w-full max-w-xs footer-page-input"
				/>
			</div>
			<div>
				<select
					onChange={(e) => {
						const value = e.target.value;
						setCurrentPage(0);
						setRowsPerPage(Number(value));
					}}
					defaultValue="default"
					className="select select-primary w-full max-w-xs"
				>
					<option disabled value="default">
						Select rows per page
					</option>
					{pageSizes.map((pageSize: number) => {
						return (
							<option value={pageSize} key={pageSize}>
								{pageSize}
							</option>
						);
					})}
				</select>
			</div>
			<div className="footer-row">
				<button
					className="btn btn-circle"
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}
					disabled={currentPage === totalPages - 1}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-right"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</button>
				<button
					className="btn btn-circle"
					onClick={() => {
						setCurrentPage(totalPages - 1);
					}}
					disabled={currentPage === totalPages - 1}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-double-right"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
						/>
						<path
							fillRule="evenodd"
							d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default FooterPagination;
