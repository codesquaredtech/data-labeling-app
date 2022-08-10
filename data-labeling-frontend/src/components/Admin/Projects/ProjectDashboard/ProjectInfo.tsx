import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { projectsSliceSelectors } from "../../../../slices/Projects/projectsSlice";

export default function ProjectInfo() {
	const { title, description } = useSelector(projectsSliceSelectors.project) || {};
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="flex flex-col w-full h-fit mb-8">
			<div className="flex items-center gap-2">
				<button className="btn btn-circle btn-primary btn-sm" onClick={() => navigate("/admin/projects")}>
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
				<div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className="flex w-fit"
				>
					<h1 className="text-3xl mr-2">{title || "Project name"}</h1>
					{isHovered && <span className="text-sm text-warning">Edit</span>}
				</div>
			</div>
			<div className="divider mt-2 mb-4 w-full h-0.5 before:bg-gradient-to-r before:from-primary before:to-base-100 after:bg-base-100" />
			<div>{description || "Project description"}</div>
		</div>
	);
}
