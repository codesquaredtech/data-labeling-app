import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../config/store";
import { getProjectById, getUsersByProjectId } from "../../../../actions/project";
import { getMetadataByProjectId } from "../../../../actions/metadata";
import MetadataList from "./Lists/MetadataList";
import UsersList from "./Lists/UsersList";
import ProjectStats from "./ProjectStats";
import ProjectInfo from "./ProjectInfo";
import ResourcesList from "./Lists/ResourcesList";
import { getResourcesByProjectId } from "../../../../actions/resource";

export const ProjectDashboard = () => {
	const { id: projectId } = useParams();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (projectId) {
			dispatch(getProjectById(projectId));
			dispatch(getMetadataByProjectId(projectId));
			dispatch(getUsersByProjectId(projectId));
			dispatch(getResourcesByProjectId(projectId));
		}
	}, [dispatch, projectId]);

	return (
		<div className="flex flex-col w-full h-full pt-8 pb-8 pl-10 pr-10">
			<ProjectInfo />
			<ProjectStats />
			{/* Users, Metadata, Resources lists */}
			<div className="flex flex-wrap w-full gap-4 h-96">
				<UsersList />
				<MetadataList />
				<ResourcesList />
			</div>
		</div>
	);
};
