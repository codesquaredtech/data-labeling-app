import React from "react";
import { useParams } from "react-router-dom";

export const ProjectDashboard = () => {
	const { projectId } = useParams<{ projectId: string }>();

	return (
		<div>
			<h1>Project Dashboard</h1>
		</div>
	);
};
