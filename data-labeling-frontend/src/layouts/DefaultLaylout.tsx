import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppTheme } from "../types/global";
import { authSliceSelectors } from "../slices/Auth/authSlice";
import { login, logout } from "../actions/auth";
import { AppDispatch } from "../config/store";
import { getTheme } from "../utils";

interface Props {
	component: FC;
}
export const DefaultLayout = ({ component: Component }: Props) => {
	const [theme, setTheme] = useState<string>(getTheme());
	const token = useSelector(authSliceSelectors.token);
	const dispatch = useDispatch<AppDispatch>();

	const handleLogin = () => {
		dispatch(login());
	};
	const handleLogout = () => {
		dispatch(logout());
	};

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div data-theme={theme}>
			<div className="navbar bg-base-300">
				<div className="flex-1 ml-2">
					<button
						onClick={() => window.location.reload()}
						className="btn btn-ghost normal-case text-xl font-mono font-thin"
					>
						Data<span className="text-primary-focus font-bold">Labeling</span>
					</button>
				</div>
				<div className="flex-none mr-2">
					<ul className="menu menu-horizontal p-0">
						<li>
							<div>
								{theme}
								<svg
									className="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
								>
									<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
								</svg>
							</div>
							<ul className="p-2 bg-base-100">
								{Object.values(AppTheme).map((item) => (
									<li
										className={`${item === theme ? "bg-primary-focus" : ""}`}
										key={item}
										onClick={() => handleThemeChange(item)}
									>
										<div>{item}</div>
									</li>
								))}
							</ul>
						</li>
					</ul>
				</div>
				<div className="flex-none mr-2">
					<button onClick={!token ? handleLogin : handleLogout} className="btn btn-primary">
						{token ? "Logout" : "Login"}
					</button>
				</div>
			</div>
			<div className="min-h-[calc(100vh_-_64px)] flex flex-col justify-around">
				<Component />
			</div>
		</div>
	);
};
