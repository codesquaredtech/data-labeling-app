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
		<div className="hero bg-base-100">
			<div className="hero-content flex-col lg:flex-row-reverse lg:gap-10">
				<div className="flex flex-col lg:w-3/5">
					<h1 className="text-4xl">Welcome to</h1>
					<h1 className="text-5xl font-mono font-thin animate-bounce ">
						Data
						<span className="font-bold text-primary-focus hover:animate-pulse">Labeling</span>
					</h1>
					<div className="text-3xl mt-6">Who says labeling data can't be fun?</div>
					<p className="py-6">
						Our application brings innovative ways of labeling all kinds of data that you can think of. Feel
						free to try it out for free!
					</p>
				</div>
				<div className="card flex-shrink-0 w-full h-96 lg:max-w-sm shadow-2xl bg-neutral">
					<div className="card-body text-center items-center">
						<div className="divider mb-6 before:bg-gradient-to-r before:from-primary after:bg-gradient-to-l after:from-primary">
							<h2 className="card-title text-2xl text-neutral-content">Login</h2>
						</div>
						<p className="text-neutral-content">Please authenticate with your Google account.</p>
						<div onClick={handleLogin} className="cursor-pointer">
							<svg
								className="fill-transparent stroke-primary hover:fill-primary hover:stroke-transparent w-28"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
							</svg>
						</div>
						<div className="mt-6 w-full">
							<button className="btn btn-outline btn-primary w-full" onClick={handleLogin}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
