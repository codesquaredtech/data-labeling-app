import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProjectsAdmin } from "../../actions/project";
import { AppDispatch } from "../../config/store";
import { clearState, projectsSliceSelectors } from "../../slices/Projects/projectsSlice";
import Table from "../Global/Table";
import CreateEditProject from "./CreateEditProject";

export const Admin = () => {
	const data = useSelector(projectsSliceSelectors.projects);
	const loading = useSelector(projectsSliceSelectors.fetchLoading);
	const [currentPage, setCurrentPage] = useState(0); // Current page
	const [pageCount, setPageCount] = useState(1); // Total pages
	const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items in each page
	const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllProjectsAdmin());
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	const columns = useMemo(
		() => [
			{ Header: "ID", accessor: "identNumber", disableFilters: true },
			{ Header: "Title", accessor: "title", disableFilters: true, width: 400 },
			{
				Header: "Description",
				accessor: "description",
				disableFilters: true,
				width: 600,
			},
			{ Header: "User IDs", accessor: "users", disableFilters: true, width: 600 },
		],
		[],
	);

	return (
		<div className="flex w-full max-h-[calc(100vh_-_64px)] justify-center align-middle">
			<div className="w-10/12 m-20">
				<div className="mb-4 -mt-10">
					<CreateEditProject />
				</div>
				<Table
					data={data}
					columns={columns}
					title="Projects"
					footerText="Project Table Footer"
					checkbox
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					rowsPerPage={rowsPerPage}
					setRowsPerPage={setRowsPerPage}
					totalPages={pageCount}
					pageSizes={pageSizes}
					isLoading={loading}
				/>
			</div>
		</div>
	);
};
