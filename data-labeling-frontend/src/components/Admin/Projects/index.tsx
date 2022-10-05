import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellValue } from "react-table";
import StatsCard from "./ProjectDashboard/StatsCard";
import { getAllAdminProjects } from "../../../actions/project";
import { AppDispatch } from "../../../config/store";
import { clearState, projectsSliceSelectors } from "../../../slices/Projects/projectsSlice";
import Table from "../../Global/Table";
import CreateEditProjectForm from "./CreateEditProjectForm";
import Modal from "../../Global/Modal";

export const Projects = () => {
  const data = useSelector(projectsSliceSelectors.projects);
  const loading = useSelector(projectsSliceSelectors.fetchLoading);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [pageCount, setPageCount] = useState(1); // Total pages
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items in each page
  const pageSizes = [5, 10, 25, 50, 100]; // Rows per page options
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAdminProjects());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const handleNavigate = useCallback(
    (projectId: string, location?: string) => {
      navigate(`/admin/projects/${projectId}${location ? `/${location}` : ""}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        id: "Action",
        width: 150,
        Cell: ({ row }: CellValue) => (
          <span className="flex justify-start gap-2">
            <button
              className="btn btn-circle btn-primary"
              onClick={() => handleNavigate(row.original.identNumber, "metadata")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-meta"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a54.944 54.944 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3c.319 0 .625.039.924.122.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714Zm1.516 2.224c-.252-.41-.494-.787-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87l-.937-1.565ZM4.846 4.756c.725.1 1.385.634 2.34 2.001A212.13 212.13 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264.091 0 .181.006.27.018Z"
                />
              </svg>
            </button>
            <button
              className="btn btn-circle btn-secondary"
              onClick={() => handleNavigate(row.original.identNumber, "resources")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard-data"
                viewBox="0 0 16 16"
              >
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
          </span>
        ),
      },
      {
        Header: "Title",
        accessor: "title",
        disableFilters: true,
        width: 300,
        Cell: ({ row }: CellValue) => (
          <div className="cursor-pointer text-primary-focus" onClick={() => handleNavigate(row.original.identNumber)}>
            {row.original.title}
          </div>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
        disableFilters: true,
        width: 600,
        Cell: ({ row }: CellValue) => <div className="truncate">{row.original.description}</div>,
      },
      {
        Header: "Draft",
        width: 100,
        accessor: "draft",
        disableFilters: true,
        Cell: ({ value }: CellValue) => (
          <div>
            <input type="checkbox" checked={value || value === undefined} className="checkbox" disabled />
          </div>
        ),
      },
      { Header: "Users", width: 260, accessor: "users.length", disableFilters: true },
      { Header: "Metadata", width: 265, accessor: "metadata.length", disableFilters: true },
    ],
    [handleNavigate],
  );

  return (
    <>
      <div className="flex flex-col w-full h-full pt-8 pb-8 pl-10 pr-10">
        <div className="flex flex-col w-full h-fit mb-8">
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-primary btn-sm" onClick={() => navigate("/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            <h1 className="text-3xl mr-2">Projects</h1>
          </div>
          <div className="divider mt-2 mb-2 w-full h-0.5 before:bg-gradient-to-r before:from-primary before:to-base-100 after:bg-base-100" />
        </div>

        {/* Progress stats */}
        <div className="flex flex-wrap w-full h-1/5 gap-4 mb-8">
          <StatsCard
            title={"Overall Progress"}
            type={"percentage"}
            countupDuration={1.3}
            currentValue={4}
            totalValue={16}
            extraText={"projects completed"}
          />
          <StatsCard
            title={"Avg. Time per Project"}
            type={"time"}
            countupDuration={1.3}
            days={12}
            hours={9}
            progressValue={-4}
            progressTimeUnit={"h"}
            extraText={"slower"}
          />
          <StatsCard
            title={"Total Time"}
            type={"time"}
            countupDuration={1.3}
            days={34}
            hours={23}
            progressValue={44}
            progressTimeUnit={"h"}
            extraText={"since last week"}
          />
          <StatsCard
            title={"Total Reviewed"}
            type={"percentage"}
            countupDuration={1.3}
            currentValue={430}
            totalValue={1429}
            extraText={"labeled data"}
          />
        </div>

        {/* Projects table */}
        <div className="card flex flex-col w-full h-fit p-4 bg-neutral-focus">
          <div className="mb-4">
            <button onClick={() => setCreateModalOpen(true)} className="btn btn-primary">
              Add project
            </button>
          </div>
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
        </div>
      </div>
      {createModalOpen && (
        <Modal
          hideButton
          title="Add project"
          buttonTitle="Add project"
          setOpen={setCreateModalOpen}
          open={createModalOpen}
        >
          <CreateEditProjectForm onDone={() => setCreateModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};
