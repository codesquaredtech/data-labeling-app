import React, { useMemo } from "react";
import {
	useTable,
	useSortBy,
	useFilters,
	usePagination,
	useResizeColumns,
	useRowSelect,
	useBlockLayout,
	useColumnOrder,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { DefaultColumnFilter } from "./TableHeader/filters";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableInfo from "./TableInfo";
import TableCheckbox from "./TableCheckbox";
import LoadingSpinner from "../LoadingSpinner";
import { TableProps } from "./types";
import { Size } from "../LoadingSpinner/types";
import "./styles/table.scss";

const Table = ({
	data,
	columns,
	title,
	footerText,
	setCurrentPage,
	setRowsPerPage,
	currentPage = 1,
	rowsPerPage = 5,
	totalPages = 1,
	pageSizes = [5, 10, 25, 50, 100],
	checkbox = false,
	isLoading = false,
}: TableProps) => {
	// default column options
	const defaultColumn = useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
			minWidth: 80, // minWidth is only used as a limit for resizing
			width: 200, // width is used for both the flex-basis and flex-grow
			maxWidth: 500, // maxWidth is only used as a limit for resizing
		}),
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		pageOptions,
		setColumnOrder,
		allColumns,
		getToggleHideAllColumnsProps,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			useControlledState: (state) => {
				return useMemo(
					() => ({
						...state,
						pageIndex: currentPage,
					}),
					[state],
				);
			},
			initialState: { pageIndex: currentPage }, // Pass our hoisted table state
			manualPagination: true, // Tell the usePagination
			// hook that we'll handle our own data fetching
			// This means we'll also have to provide our own
			// pageCount.
			pageCount: totalPages,
		},
		useFilters,
		useSortBy,
		usePagination,
		useResizeColumns,
		useBlockLayout,
		useSticky,
		useRowSelect,
		useColumnOrder,
		(hooks) => {
			if (checkbox) {
				hooks.allColumns.push((columns) => [
					// Let's make a column for selection
					{
						id: "selection",
						disableResizing: true,
						minWidth: 60,
						width: 60,
						maxWidth: 60,
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<div>
								<TableCheckbox {...getToggleAllRowsSelectedProps()} />
							</div>
						),
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
						Cell: ({ row }) => (
							<div>
								<TableCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				]);
				hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
					// fix the parent group of the selection button to not be resizable
					const selectionGroupHeader = headerGroups[0].headers[0];
					selectionGroupHeader.canResize = false;
				});
			}
		},
	);

	return (
		<div className="card bg-base-300 h-full w-full text-neutral-content shadow-lg border-0 overflow-scroll">
			<div className="table sticky">
				<div {...getTableProps()}>
					<div className="header bg-base-300 shadow-md">
						<TableInfo
							title={title}
							allColumns={allColumns}
							getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
						/>
						<TableHeader
							headerGroups={headerGroups}
							setColumnOrder={setColumnOrder}
							allColumns={allColumns}
						/>
					</div>
					{isLoading ? (
						<div className="flex w-full h-full align-middle justify-center">
							<LoadingSpinner size={Size.XL} />
						</div>
					) : (
						<TableBody getTableBodyProps={getTableBodyProps} prepareRow={prepareRow} page={page} />
					)}
				</div>
				<TableFooter
					pageOptions={pageOptions}
					footerText={footerText}
					currentPage={currentPage}
					rowsPerPage={rowsPerPage}
					totalPages={totalPages}
					pageSizes={pageSizes}
					setRowsPerPage={setRowsPerPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default Table;
