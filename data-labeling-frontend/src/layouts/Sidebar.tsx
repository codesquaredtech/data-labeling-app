import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../hooks/outsideClick";
import { authSliceSelectors } from "../slices/Auth/authSlice";

export type SidebarProps = {
	open: boolean;
	onClose: () => void;
	onLogout: () => void;
	children: React.ReactNode;
};

export default function Sidebar({ open, onClose, onLogout, children }: SidebarProps) {
	const { displayName, email } = useSelector(authSliceSelectors.user) || {};
	const navigate = useNavigate();

	const drawerRef = useRef(null);
	useOutsideClick(drawerRef, onClose);

	return (
		<div className="drawer">
			<input id="my-drawer" checked={open} type="checkbox" readOnly className="drawer-toggle" />
			<div className="drawer-content overflow-x-hidden">{children}</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay" />
				<ul ref={drawerRef} className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
					<div className="flex w-full justify-between align-items-center mb-3">
						<div
							onClick={() => navigate("/")}
							className="normal-case text-xl font-mono font-thin cursor-pointer hover:text-current"
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
									fillRule="evenodd"
									d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
								/>
								<path
									fillRule="evenodd"
									d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
								/>
							</svg>
						</div>
					</div>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
							<svg
								className="w-4 h-4 stroke-current text-neutral-content"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
								></path>
							</svg>
						</div>
						<input
							type="text"
							className="w-full rounded pl-8 pr-4 py-2.5 text-sm text-neutral-content placeholder-neutral-content font-light bg-neutral-focus focus:outline-none focus:ring-1 focus:ring-primary focus:bg-neutral"
							placeholder="search"
						/>
					</div>
					<div className="pt-4 pb-4">
						<hr className="border-neutral-content" />
					</div>
					<li onClick={() => navigate("/")}>
						<div className="flex gap-2 items-center">
							<svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M9.75 8.75V19"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M5 8.25H19"
								></path>
							</svg>
							<span>Dashboard</span>
						</div>
					</li>
					<li onClick={() => navigate("/admin/projects")}>
						<div className="flex gap-2 items-center">
							<svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M18 9.25H13.75V5"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M9.75 15.25H14.25"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M9.75 12.25H14.25"
								></path>
							</svg>
							<span>Projects</span>
						</div>
					</li>
					<li onClick={() => navigate("/user/projects")}>
						<div className="flex gap-2 items-center">
							<svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
								<circle cx="15" cy="9" r="1" fill="currentColor"></circle>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M12 4.75H19.25V12L12.5535 18.6708C11.7544 19.4668 10.4556 19.445 9.68369 18.6226L5.28993 13.941C4.54041 13.1424 4.57265 11.8895 5.36226 11.1305L12 4.75Z"
								></path>
							</svg>
							<span>Label data</span>
						</div>
					</li>
					<div className="flex flex-col h-full justify-end">
						<div className="pt-4 pb-4">
							<hr className="border-neutral-content" />
						</div>
						<li>
							<div className="flex gap-2 items-center">
								<svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M13.1191 5.61336C13.0508 5.11856 12.6279 4.75 12.1285 4.75H11.8715C11.3721 4.75 10.9492 5.11856 10.8809 5.61336L10.7938 6.24511C10.7382 6.64815 10.4403 6.96897 10.0622 7.11922C10.006 7.14156 9.95021 7.16484 9.89497 7.18905C9.52217 7.3524 9.08438 7.3384 8.75876 7.09419L8.45119 6.86351C8.05307 6.56492 7.49597 6.60451 7.14408 6.9564L6.95641 7.14408C6.60452 7.49597 6.56492 8.05306 6.86351 8.45118L7.09419 8.75876C7.33841 9.08437 7.3524 9.52216 7.18905 9.89497C7.16484 9.95021 7.14156 10.006 7.11922 10.0622C6.96897 10.4403 6.64815 10.7382 6.24511 10.7938L5.61336 10.8809C5.11856 10.9492 4.75 11.372 4.75 11.8715V12.1285C4.75 12.6279 5.11856 13.0508 5.61336 13.1191L6.24511 13.2062C6.64815 13.2618 6.96897 13.5597 7.11922 13.9378C7.14156 13.994 7.16484 14.0498 7.18905 14.105C7.3524 14.4778 7.3384 14.9156 7.09419 15.2412L6.86351 15.5488C6.56492 15.9469 6.60451 16.504 6.9564 16.8559L7.14408 17.0436C7.49597 17.3955 8.05306 17.4351 8.45118 17.1365L8.75876 16.9058C9.08437 16.6616 9.52216 16.6476 9.89496 16.811C9.95021 16.8352 10.006 16.8584 10.0622 16.8808C10.4403 17.031 10.7382 17.3519 10.7938 17.7549L10.8809 18.3866C10.9492 18.8814 11.3721 19.25 11.8715 19.25H12.1285C12.6279 19.25 13.0508 18.8814 13.1191 18.3866L13.2062 17.7549C13.2618 17.3519 13.5597 17.031 13.9378 16.8808C13.994 16.8584 14.0498 16.8352 14.105 16.8109C14.4778 16.6476 14.9156 16.6616 15.2412 16.9058L15.5488 17.1365C15.9469 17.4351 16.504 17.3955 16.8559 17.0436L17.0436 16.8559C17.3955 16.504 17.4351 15.9469 17.1365 15.5488L16.9058 15.2412C16.6616 14.9156 16.6476 14.4778 16.811 14.105C16.8352 14.0498 16.8584 13.994 16.8808 13.9378C17.031 13.5597 17.3519 13.2618 17.7549 13.2062L18.3866 13.1191C18.8814 13.0508 19.25 12.6279 19.25 12.1285V11.8715C19.25 11.3721 18.8814 10.9492 18.3866 10.8809L17.7549 10.7938C17.3519 10.7382 17.031 10.4403 16.8808 10.0622C16.8584 10.006 16.8352 9.95021 16.8109 9.89496C16.6476 9.52216 16.6616 9.08437 16.9058 8.75875L17.1365 8.4512C17.4351 8.05308 17.3955 7.49599 17.0436 7.1441L16.8559 6.95642C16.504 6.60453 15.9469 6.56494 15.5488 6.86353L15.2412 7.09419C14.9156 7.33841 14.4778 7.3524 14.105 7.18905C14.0498 7.16484 13.994 7.14156 13.9378 7.11922C13.5597 6.96897 13.2618 6.64815 13.2062 6.24511L13.1191 5.61336Z"
									></path>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12Z"
									></path>
								</svg>
								<span>Settings</span>
							</div>
						</li>
						<li>
							<div className="flex gap-2 items-center mb-16">
								<svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M17.25 12V10C17.25 7.1005 14.8995 4.75 12 4.75C9.10051 4.75 6.75 7.10051 6.75 10V12L4.75 16.25H19.25L17.25 12Z"
									></path>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M9 16.75C9 16.75 9 19.25 12 19.25C15 19.25 15 16.75 15 16.75"
									></path>
								</svg>
								<span>Notifications</span>
							</div>
						</li>
					</div>
					<div className="p-4 -m-6 bg-base-300 flex items-center justify-between">
						<div className="flex items-center">
							<div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									fill="currentColor"
									className="bi bi-person-circle"
									viewBox="0 0 16 16"
								>
									<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
									<path
										fillRule="evenodd"
										d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
									/>
								</svg>
							</div>
							<div className="flex flex-col pl-3">
								<div className="text-sm text-base-content">{displayName || "N/A"}</div>
								<span className="text-xs text-base-content opacity-60 font-light tracking-tight">
									{email || "N/A"}
								</span>
							</div>
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
}
