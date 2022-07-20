import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DefaultLayout } from "./layouts/DefaultLaylout";
import { AddMetadata } from "./pages/AddMetadata";
import { AddResourcePage } from "./pages/AddResourcePage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import LabelingData from "./pages/LabelingData";
import { ProjectDetail } from "./pages/ProjectDetail";
import { LoginPage } from "./pages/Public/LoginPage";
import { authSlice, authSliceSelectors } from "./slices/Auth/authSlice";
import { UserPage } from "./pages/User/UserPage";

const AdminRoutes = (props) => {
	const token = useSelector(authSliceSelectors.token);
	const isAdmin = useSelector(authSliceSelectors.isAdmin);

	if (token) {
		if (isAdmin) {
			return <DefaultLayout {...props} />;
		}
		return <Navigate to="/" replace />;
	}
	return <Navigate to="/login" replace />;
};

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
				<Route path="/admin" element={<AdminRoutes component={AdminPage} />} />
				<Route path="/user" element={<AuthorizedRoute component={UserPage} />} />
				{/* <AuthorizedRoute path="/project/metadata/:id" element={<AddMetadata />} />
				<AuthorizedRoute path="/user" element={<UserHome />} />
				<AuthorizedRoute path="/add-project" element={<AddProject />} />
				<AuthorizedRoute path="/project/:id" element={<ProjectDetail />} />
				<AuthorizedRoute path=":id/labeling-data" element={<LabelingData />} />
				<AuthorizedRoute path="/project/resource/:id" element={<AddResourcePage />} /> */}
			</RouterRoutes>
		</BrowserRouter>
	);
};
