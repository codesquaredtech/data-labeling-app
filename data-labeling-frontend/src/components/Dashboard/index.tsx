import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../actions/auth";
import { AppDispatch } from "../../config/store";
import { authSliceSelectors } from "../../slices/Auth/authSlice";

export const Dashboard = () => {
	const user = useSelector(authSliceSelectors.user);
	const role = user ? (user.isAdmin ? "Admin" : "User") : "Unknown";
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	return (
		<div className="flex w-full justify-center">
			<div className="card w-5/12 bg-neutral text-neutral-content">
				<div className="card-body text-center items-center">
					<div className="divider mb-6 before:bg-gradient-to-r before:from-primary after:bg-gradient-to-l after:from-primary">
						<h2 className="card-title text-2xl text-neutral-content">Dashboard</h2>
					</div>
					<div className="mt-6">
						Hello {user?.displayName || "user"}, your role is {role} and you can
						{role === "Admin" ? " create and" : ""} label the data.
					</div>
					<div className="card-actions justify-center w-full">
						{role === "Admin" && (
							<button
								className="btn btn-outline btn-primary mt-4 lg:w-52 md:w-full"
								onClick={() => navigate("/admin/projects")}
							>
								Create the data
							</button>
						)}
						<button
							className="btn btn-outline btn-primary mt-4 lg:w-52 md:w-full"
							onClick={() => navigate("/user/projects")}
						>
							Label the data
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
