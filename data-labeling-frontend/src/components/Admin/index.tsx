import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/api/axios";
import Table from "../Global/Table";
import { calculatePageCount } from "../Global/Table/TableUtilities";

export const Admin = () => {
	let counter = 0;
	const handler = () => {
		counter++;
		alert(`Hanlder called! Counter is: ${counter}`);
	};

	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0); // Current page
	const [pageCount, setPageCount] = useState(1); // Total pages
	const [rowsPerPage, setRowsPerPage] = useState(10); // Number of items in each page
	const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let totalCount = 0;
		setIsLoading(true);

		axiosInstance
			.get(`https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${rowsPerPage}`)
			.then((res) => {
				totalCount = res.data.totalPassengers;
				setPageCount(calculatePageCount(totalCount, rowsPerPage));
				setData(res.data.data);
				setIsLoading(false);
			});
	}, [currentPage, rowsPerPage]);

	const columns = useMemo(
		() => [
			{ Header: "ID", accessor: "_id", disableFilters: true },
			{ Header: "Name", accessor: "name", disableFilters: true },
			{ Header: "Trips", accessor: "trips", disableFilters: true },
			{ Header: "Airline ID", accessor: "airline[0].id", disableFilters: true },
			{
				Header: "Airline name",
				accessor: "airline[0].name",
				disableFilters: true,
			},
			{
				Header: "Airline logo",
				accessor: "airline[0].logo",
				disableFilters: true,
			},
			{
				Header: "Airline slogan",
				accessor: "airline[0].slogan",
				disableFilters: true,
			},
			{
				Header: "Airline head quaters",
				accessor: "airline[0].head_quaters",
				disableFilters: true,
			},
			{
				Header: "Airline website",
				accessor: "airline[0].website",
				disableFilters: true,
			},
			{
				Header: "Airline established",
				accessor: "airline[0].established",
				disableFilters: true,
			},
		],
		[],
	);

	return (
		<div className="flex w-full max-h-[calc(100vh_-_64px)] justify-center align-middle">
			<div className="card w-10/12 bg-transparent text-neutral-content overflow-auto m-20 shadow-lg">
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
					isLoading={isLoading}
				/>
				{/* <div style={{ textAlign: "center", marginTop: "50px" }}>
					<h5>Желите ли додати нови пројекат? </h5>
					<p></p>

					<Link to="/add-project">
						<Button>Додај!</Button>
					</Link>
				</div> */}
			</div>
		</div>
	);
};
