import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { AppDispatch } from "../../config/store";

export const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const handleLogin = () => {
		dispatch(login());
	};

	return (
		<div className="w-full flex justify-center">
			<div className="card w-96 bg-neutral text-neutral-content">
				<div className="card-body items-center text-center">
					<h2 className="card-title">Welcome</h2>
					<p>Please authenticate with your Google account.</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary mt-4" onClick={handleLogin}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
