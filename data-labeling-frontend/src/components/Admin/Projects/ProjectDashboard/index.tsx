import React from "react";
import { useParams } from "react-router-dom";

export const ProjectDashboard = () => {
	const { projectId } = useParams<{ projectId: string }>();

	return (
		<div className="flex flex-col w-full h-[calc(100vh_-_64px)] pt-8 pb-8 pl-6 pr-6">
			<div className="flex flex-col w-full h-fit mb-8">
				<h1 className="text-3xl mb-2">Project X</h1>
				<div className="text-l">
					Project description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque purus.
					Maecenas cursus eros felis, in convallis eros tempus id. Nunc aliquam a sapien quis pharetra.
				</div>
			</div>
			<div className="flex w-full gap-4 h-96">
				<div className="flex flex-col w-1/3 p-4 bg-neutral-focus card">
					<h2 className="text-2xl mb-4 text-neutral-content">Team</h2>
					<div className="flex flex-col w-full h-full gap-2 overflow-auto">
						<div className="card bg-base-100 shadow-xl">
							<div className="card-body p-3">
								<div className="flex w-full gap-3">
									<div className="flex align-items-center justify-start w-1/4">
										<div className="avatar">
											<div className="w-14 rounded-full">
												<img src="https://placeimg.com/192/192/people" />
											</div>
										</div>
									</div>
									<div className="flex flex-col w-full justify-center">
										<h2 className="text-l font-bold">Laura James</h2>
										<div className="text-m text-accent">laura@email.com</div>
									</div>
									<div className="flex flex-col w-full justify-start align-items-end">
										<button className="btn btn-xs btn-circle btn-error btn-outline">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-x"
												viewBox="0 0 16 16"
											>
												<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-1/3 h-full p-4 bg-neutral-focus card">
					<h2 className="text-2xl mb-4 text-neutral-content">Metadata</h2>
				</div>
				<div className="flex flex-col w-1/3 h-full p-4 bg-neutral-focus card">
					<h2 className="text-2xl mb-4 text-neutral-content">Resources</h2>
				</div>
			</div>
		</div>
	);
};
