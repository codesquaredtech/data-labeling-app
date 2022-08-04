import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const team = [
	{
		id: 1,
		name: "John Doe",
		email: "john@email.com",
		avatar: "https://placeimg.com/192/192/people",
	},
	{
		id: 2,
		name: "Laura James",
		email: "laura@mail.com",
		avatar: "https://placeimg.com/192/192/people",
	},
	{
		id: 3,
		name: "Mike Browney",
		email: "browney@mail.com",
		avatar: "https://placeimg.com/192/192/people",
	},
	{
		id: 4,
		name: "Don Joe",
		email: "don@email.com",
		avatar: "https://placeimg.com/192/192/people",
	},
];

const metadata = [
	{
		id: 1,
		name: "Author",
		type: "text",
	},
	{
		id: 2,
		name: "Is sarcastic?",
		type: "boolean",
	},
	{
		id: 3,
		name: "Is bot?",
		type: "boolean",
	},
	{
		id: 4,
		name: "How positive is comment (1-10)?",
		type: "number",
	},
	{
		id: 5,
		name: "Summary",
		type: "text",
	},
];

const resources = [
	{
		id: 1,
		title: "Comment 1",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl.",
	},
	{
		id: 2,
		title: "Comment 2",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 3,
		title: "Comment 3",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl.",
	},
	{
		id: 4,
		title: "Comment 4",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, vitae ultricies nisl nunc eget nisl.",
	},
];

export const ProjectDashboard = () => {
	const { projectId } = useParams<{ projectId: string }>();

	return (
		<div className="flex flex-col w-full h-[calc(100vh_-_64px)] pt-8 pb-8 pl-10 pr-10">
			<div className="flex flex-col w-full h-fit mb-8">
				<h1 className="text-3xl mb-2">Project X</h1>
				<div>
					Project description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque purus.
					Maecenas cursus eros felis, in convallis eros tempus id. Nunc aliquam a sapien quis pharetra. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque purus. Maecenas cursus eros felis,
					in convallis.
				</div>
			</div>
			<div className="flex w-full gap-4 h-80 mb-8">
				<div className="card flex flex-col w-1/4 p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Overall Progress</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">20.2%</h4>
						<div className="text-primary-focus text-3xl font-bold">
							698 / <span className="text-lg font-bold text-neutral-content">3560</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content">resources</span>
					</div>
				</div>
				<div className="card flex flex-col w-1/4 p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Avg. Time per Resource</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">2m 35s</h4>
						<div className="text-error text-3xl font-bold">-35s</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content">slower</span>
					</div>
				</div>
				<div className="card flex flex-col w-1/4 p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Total Time</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">17h 33m</h4>
						<div className="text-success text-3xl font-bold">+2h</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content">since last week</span>
					</div>
				</div>
				<div className="card flex flex-col w-1/4 p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Total Reviewed</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">11.8%</h4>
						<div className="text-primary-focus text-3xl font-bold">
							72 / <span className="text-lg font-bold text-neutral-content">698</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content">labeled data</span>
					</div>
				</div>
			</div>

			<div className="flex w-full gap-4 h-full overflow-hidden">
				<div className="card flex flex-col w-1/3 p-4 bg-neutral-focus">
					<div className="flex gap-2">
						<h2 className="text-2xl mb-4 text-neutral-content">Team</h2>
						<div className="divider w-full h-1 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
						<button className="btn btn-success btn-sm">
							Add
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-plus"
								viewBox="0 0 16 16"
							>
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
							</svg>
						</button>
					</div>
					<div className="overflow-y-auto">
						{team.map((member) => (
							<Card
								key={member.id}
								type="user"
								title={member.name}
								subtitle={member.email}
								icon={member.avatar}
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col w-1/3 h-full p-4 bg-neutral-focus card">
					<div className="flex gap-2">
						<h2 className="text-2xl mb-4 text-neutral-content">Metadata</h2>
						<div className="divider w-full h-1 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
						<button className="btn btn-success btn-sm">
							Add
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-plus"
								viewBox="0 0 16 16"
							>
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
							</svg>
						</button>
					</div>
					<div className="overflow-y-auto">
						{metadata.map((meta) => (
							<Card key={meta.id} type="metadata" title={meta.name} subtitle={meta.type} />
						))}
					</div>
				</div>
				<div className="flex flex-col w-1/3 h-full p-4 bg-neutral-focus card">
					<div className="flex gap-2">
						<h2 className="text-2xl mb-4 text-neutral-content">Resources</h2>
						<div className="divider w-full h-1 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
						<button className="btn btn-success btn-sm">
							Add
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-plus"
								viewBox="0 0 16 16"
							>
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
							</svg>
						</button>
					</div>
					<div className="overflow-y-auto">
						{resources.map((resource) => (
							<Card key={resource.id} type="resource" title={resource.title} subtitle={resource.text} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
