import React, { useEffect } from "react";
import { BrowserRouter, Routes as ReactRouterRoutes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { setupAxiosInterceptors } from './config/api/axios'

const AdminRoutes = (props) => {
	const token = useSelector(authSliceSelectors.token);
	const isAdmin = useSelector(authSliceSelectors.isAdmin);

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
	return token ? <DefaultLayout {...props} /> : <Navigate to="/login" replace />;
};

const PublicRoute = (props) => {
	const token = useSelector(authSliceSelectors.token);

	return !token ? <DefaultLayout {...props} /> : <Navigate to="/" replace />;
};


const RouterRoutes = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		setupAxiosInterceptors(navigate, dispatch);
	}, [])
	return <ReactRouterRoutes {...props} />
}

export const Routes = () => {
	const token = useSelector(authSliceSelectors.token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(getMe());
		}
	}, [dispatch, token]);

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
