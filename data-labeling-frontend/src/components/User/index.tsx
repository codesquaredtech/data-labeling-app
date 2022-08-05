import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CellValue } from "react-table";
import { getAllProjectsUser } from "../../actions/project";
import { AppDispatch } from "../../config/store";
import { clearState, projectsSliceSelectors } from "../../slices/Projects/projectsSlice";
import Table from "../Global/Table";
import LabelData from "./LabelDataForm";

export const User = () => {
	const [projectId, setProjectId] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const data = useSelector(projectsSliceSelectors.projects);
	const loading = useSelector(projectsSliceSelectors.fetchLoading);

	// table props
	const [currentPage, setCurrentPage] = useState(0); // Current page
	const [pageCount, setPageCount] = useState(1); // Total pages
	const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items in each page
	const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getAllProjectsUser());
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	const handleLabelData = (id: string) => {
		setProjectId(id);
		setModalOpen(true);
	};

	const columns = useMemo(
		() => [
			{
				Header: "Action",
				id: "Action",
				width: 150,
				Cell: ({ row }: CellValue) => (
					<span style={{ display: "flex", flexDirection: "row" }}>
						<button
							className="btn btn-circle btn-primary"
							onClick={() => handleLabelData(row.original.identNumber)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-pencil-square"
								viewBox="0 0 16 16"
							>
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
								<path
									fillRule="evenodd"
									d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
								/>
							</svg>
						</button>
					</span>
				),
			},
			{ Header: "ID", accessor: "identNumber", disableFilters: true },
			{ Header: "Title", accessor: "title", disableFilters: true, width: 300 },
			{
				Header: "Description",
				accessor: "description",
				disableFilters: true,
				width: 450,
			},
			{
				Header: "Metadata",
				accessor: "metadata",
				disableFilters: true,
				width: 500,
			},
		],
		[],
	);

	return (
		<div className="flex w-full max-h-[calc(100vh_-_64px)] justify-center align-middle">
			<div className="w-10/12 m-20">
				<Table
					data={data}
					columns={columns}
					title="Projects"
					checkbox
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					rowsPerPage={rowsPerPage}
					setRowsPerPage={setRowsPerPage}
					totalPages={pageCount}
					pageSizes={pageSizes}
					isLoading={loading}
				/>
				<LabelData projectId={projectId} open={modalOpen} setOpen={setModalOpen} />
			</div>
		</div>
	);
};
