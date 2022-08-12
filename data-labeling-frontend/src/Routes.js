import React, { useEffect } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DefaultLayout } from "./layouts/DefaultLaylout";
import { ProjectsPage } from "./pages/Admin/Projects/ProjectsPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { LoginPage } from "./pages/Public/LoginPage";
import { authSliceSelectors } from "./slices/Auth/authSlice";
import { UserPage } from "./pages/User/UserPage";
import { MetadataPage } from "./pages/Admin/Projects/Metadata/MetadataPage";
import { ResourcesPage } from "./pages/Admin/Projects/Resources/ResourcesPage";
import { getMe } from "./actions/auth";
import { useDispatch } from "react-redux";
import LoadingSpinner from "./components/Global/LoadingSpinner";
import { ProjectDashboard } from "./components/Admin/Projects/ProjectDashboard";

const AdminRoutes = (props) => {
	const token = useSelector(authSliceSelectors.token);
	const isAdmin = useSelector(authSliceSelectors.isAdmin);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAdmin === undefined) {
			dispatch(getMe());
		}
	}, [dispatch, isAdmin]);

	if (token) {
		if (isAdmin !== undefined) {
			if (isAdmin) {
				return <DefaultLayout {...props} />;
			}
			return <Navigate to="/" replace />;
		}

		return <DefaultLayout component={LoadingSpinner} />;
	}
	return <Navigate to="/login" replace />;
};

const AuthorizedRoute = (props) => {
	const token = useSelector(authSliceSelectors.token);
	const isAdmin = useSelector(authSliceSelectors.isAdmin);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAdmin === undefined) {
			dispatch(getMe());
		}
	}, [dispatch, isAdmin]);

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
				<Route path="/admin/projects" element={<AdminRoutes component={ProjectsPage} />} />
				<Route path="/admin/projects/:id" element={<AdminRoutes component={ProjectDashboard} />} />
				<Route path="/admin/projects/:id/metadata" element={<AdminRoutes component={MetadataPage} />} />
				<Route path="/admin/projects/:id/resources" element={<AdminRoutes component={ResourcesPage} />} />
				<Route path="/user/projects" element={<AuthorizedRoute component={UserPage} />} />
				{/* <AuthorizedRoute path="/project/metadata/:id" element={<AddMetadata />} />
				<AuthorizedRoute path="/project/:id" element={<ProjectDetail />} />
				<AuthorizedRoute path=":id/labeling-data" element={<LabelingData />} />
				<AuthorizedRoute path="/project/resource/:id" element={<AddResourcePage />} /> */}
			</RouterRoutes>
		</BrowserRouter>
	);
};
