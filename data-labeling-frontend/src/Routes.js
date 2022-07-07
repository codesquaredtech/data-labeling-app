import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DefaultLayout } from "./layouts/DefaultLaylout";
import { AddMetadata } from "./pages/AddMetadata";
import { AddProject } from "./pages/AddProject";
import { AddResourcePage } from "./pages/AddResourcePage";
import { AdminPage } from "./pages/AdminPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import LabelingData from "./pages/LabelingData";
import { ProjectDetail } from "./pages/ProjectDetail";
import { LoginPage } from "./pages/Public/LoginPage";
import UserHome from "./pages/UserHome";
import { authSlice, authSliceSelectors } from "./slices/Auth/authSlice";

const AuthorizedRoute = (props) => {
	const token = useSelector(authSliceSelectors.token);

	return token ? <DefaultLayout {...props} /> : <Navigate to="/login" replace />;
};

const PublicRoute = (props) => {
	const token = useSelector(authSliceSelectors.token);

	return !token ? <DefaultLayout {...props} /> : <Navigate to="/" replace />;
};

export const Routes = () => {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route path="login" element={<PublicRoute component={LoginPage} />} />
				<Route path="/" element={<AuthorizedRoute component={DashboardPage} />} />
				{/* <AuthorizedRoute path="/project/metadata/:id" element={<AddMetadata />} />
				<AuthorizedRoute path="/admin" element={<AdminPage />} />
				<AuthorizedRoute path="/user" element={<UserHome />} />
				<AuthorizedRoute path="/add-project" element={<AddProject />} />
				<AuthorizedRoute path="/project/:id" element={<ProjectDetail />} />
				<AuthorizedRoute path=":id/labeling-data" element={<LabelingData />} />
				<AuthorizedRoute path="/project/resource/:id" element={<AddResourcePage />} /> */}
			</RouterRoutes>
		</BrowserRouter>
	);
};
