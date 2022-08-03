import React from "react";
import { useNavigate } from "react-router-dom";

export type SidebarProps = {
	onLogout: () => void;
	children: React.ReactNode;
};

export default function Sidebar({ onLogout, children }: SidebarProps) {
	const navigate = useNavigate();

	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">{children}</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>
				<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
					<div className="flex w-full justify-between align-items-center mb-10">
						<div
							onClick={() => navigate("/")}
							className="ml-4 normal-case text-xl font-mono font-thin cursor-pointer hover:text-current"
						>
							Data<span className="text-primary-focus font-bold">Labeling</span>
						</div>
						<div onClick={onLogout} className="btn btn-ghost hover:text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-box-arrow-right"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
								/>
								<path
									fill-rule="evenodd"
									d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
								/>
							</svg>
						</div>
					</div>
					<li onClick={() => navigate("/")}>
						<span>Home</span>
					</li>
					<li onClick={() => navigate("/admin/projects")}>
						<span>Projects</span>
					</li>
					<li onClick={() => navigate("/user/projects")}>
						<span>Label data</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
