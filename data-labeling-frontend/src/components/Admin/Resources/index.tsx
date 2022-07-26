import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CellValue } from "react-table";
import { AppDispatch } from "../../../config/store";
import Table from "../../Global/Table";
import { useParams } from "react-router-dom";
import { clearState, resourcesSliceSelectors } from "../../../slices/Resources/resourcesSlice";
import { getResourcesByProjectId } from "../../../actions/resource";

export const Resources = () => {
	const data = useSelector(resourcesSliceSelectors.resourceList);
	const loading = useSelector(resourcesSliceSelectors.fetchLoading);
	const { id: projectId } = useParams();

	const [currentPage, setCurrentPage] = useState(0); // Current page
	const [pageCount, setPageCount] = useState(1); // Total pages
	const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items in each page
	const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (projectId) {
			dispatch(getResourcesByProjectId(projectId));
		}
		return () => {
			dispatch(clearState());
		};
	}, [dispatch, projectId]);

	const deleteResource = (resourceId: string) => {};

	const columns = useMemo(
		() => [
			{
				Header: "Action",
				id: "Action",
				width: 150,
				Cell: ({ row }: CellValue) => (
					<span className="flex justify-start gap-2">
						<button className="btn btn-circle btn-error" onClick={() => deleteResource(row.original._id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-trash"
								viewBox="0 0 16 16"
							>
								<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
								<path
									fill-rule="evenodd"
									d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
								/>
							</svg>
						</button>
					</span>
				),
			},
			{ Header: "ID", accessor: "_id", disableFilters: true },
			{ Header: "Title", accessor: "title", disableFilters: true, width: 400 },
			{
				Header: "Text",
				accessor: "text",
				disableFilters: true,
				width: 500,
			},
			{ Header: "Ordinal", accessor: "ordinal", disableFilters: true },
		],
		[],
	);

	return (
		<div className="flex w-full max-h-[calc(100vh_-_64px)] justify-center align-middle">
			<div className="w-10/12 m-20">
				<div className="mb-4 -mt-10">
					<button className="btn btn-primary">Add resource</button>
				</div>
				<Table
					data={data}
					columns={columns}
					title="Resources"
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
