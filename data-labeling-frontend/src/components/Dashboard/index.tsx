import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMe } from "../../actions/auth";
import { AppDispatch } from "../../config/store";
import { authSliceSelectors } from "../../slices/Auth/authSlice";

export const Dashboard = () => {
	const user = useSelector(authSliceSelectors.user);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	const handleRedirect = () => {};

	return (
		<div className="flex w-full justify-center">
			<div className="card w-1/3 bg-neutral text-neutral-content">
				<div className="card-body text-center items-center">
					<div className="divider mb-6 before:bg-gradient-to-r before:from-primary after:bg-gradient-to-l after:from-primary">
						<h2 className="card-title text-2xl text-neutral-content">Dashboard</h2>
					</div>
					<div className="mt-6">
						Hello {user?.displayName || "user"}, your role is {user?.role || "unknown"} and you can create
						and label data.
					</div>
					<div className="card-actions justify-end">
						<button className="btn btn-outline btn-primary mt-4" onClick={handleRedirect}>
							Label the data
						</button>
					</div>
				</div>
				{/* {info.isAdmin == true ? (
					<a href="/admin">Креирајте пројекте // АДМИН</a>
				) : (
					<a className="button" href="/user">
						Лабелирајте! // КОРИСНИК
					</a>
				)} */}
			</div>
		</div>
	);
};
