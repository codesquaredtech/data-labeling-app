import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CellValue } from "react-table";
import { clearState, metadataSliceSelectors } from "../../../../slices/Metadata/metadataSlice";
import { AppDispatch } from "../../../../config/store";
import Table from "../../../Global/Table";
import { deleteMetadata, getMetadataByProjectId } from "../../../../actions/metadata";
import { useParams } from "react-router-dom";
import DeleteModal from "../../../Global/DeleteModal";
import CreateEditMetadataForm from "./CreateEditMetadataForm";
import Modal from "../../../Global/Modal";

export const Metadata = () => {
	const data = useSelector(metadataSliceSelectors.metadataList);
	const loading = useSelector(metadataSliceSelectors.fetchLoading);
	const { id: projectId } = useParams();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [metadataId, setMetadataId] = useState<string | null>(null);

	const [currentPage, setCurrentPage] = useState(0); // Current page
	const [pageCount, setPageCount] = useState(1); // Total pages
	const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items in each page
	const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (projectId) {
			dispatch(getMetadataByProjectId(projectId));
		}
		return () => {
			dispatch(clearState());
		};
	}, [dispatch, projectId]);

	const handleDeleteMetadata = () => {
		if (projectId && metadataId) {
			const onDone = () => {
				dispatch(getMetadataByProjectId(projectId));
				setDeleteModalOpen(false);
			};
			dispatch(deleteMetadata({ data: { projectId, metadataId }, onDone }));
		}
	};

	const handleOpenDeleteModal = (metadataId: string) => {
		setDeleteModalOpen(true);
		setMetadataId(metadataId);
	};

	const handleEditMetadata = (metadataId: string) => {};

	const columns = useMemo(
		() => [
			{
				Header: "Action",
				id: "Action",
				width: 150,
				Cell: ({ row }: CellValue) => (
					<span className="flex justify-start gap-2">
						<button
							className="btn btn-circle btn-warning"
							onClick={() => handleEditMetadata(row.original._id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-pencil"
								viewBox="0 0 16 16"
							>
								<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
							</svg>
						</button>
						<button
							className="btn btn-circle btn-error"
							onClick={() => handleOpenDeleteModal(row.original._id)}
						>
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
									fillRule="evenodd"
									d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
								/>
							</svg>
						</button>
					</span>
				),
			},
			{ Header: "ID", accessor: "_id", disableFilters: true },
			{ Header: "Name", accessor: "name", disableFilters: true, width: 350 },
			{
				Header: "Type",
				accessor: "type",
				disableFilters: true,
				width: 350,
			},
			{
				Header: "Value",
				accessor: "value",
				disableFilters: true,
				width: 500,
				Cell: ({ row }: CellValue) => <span>{String(row.original.value)}</span>,
			},
		],
		[],
	);

	return (
		<div className="flex w-full max-h-[calc(100vh_-_64px)] justify-center align-middle">
			<div className="w-10/12 m-20">
				<div className="mb-4 -mt-10">
					<Modal title="Add metadata" setOpen={setCreateModalOpen} open={createModalOpen}>
						<CreateEditMetadataForm onDone={() => setCreateModalOpen(false)} />
					</Modal>
				</div>
				<Table
					data={data}
					columns={columns}
					title="Metadata"
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
			<DeleteModal
				open={deleteModalOpen}
				setOpen={setDeleteModalOpen}
				onDelete={handleDeleteMetadata}
				entityName="metadata"
			/>
		</div>
	);
};
