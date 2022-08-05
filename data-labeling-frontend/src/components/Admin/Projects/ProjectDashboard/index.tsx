import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import CountUp from "react-countup";

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
		id: 4,
		name: "How positive is comment (1-10)?",
		type: "number",
	},
	{
		id: 3,
		name: "Is bot?",
		type: "boolean",
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
	const [isHovered, setIsHovered] = useState(false);
	const { projectId } = useParams();

	return (
		<div className="flex flex-col w-full h-full pt-8 pb-8 pl-10 pr-10">
			<div className="flex flex-col w-full h-fit mb-8">
				<div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className="flex w-fit"
				>
					<h1 className="text-3xl mr-2">Project X</h1>
					{isHovered && <span className="text-sm text-warning">Edit</span>}
				</div>
				<div className="divider mt-2 mb-4 w-full h-0.5 before:bg-gradient-to-r before:from-primary before:to-base-100 after:bg-base-100" />
				<div>
					Project description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque purus.
					Maecenas cursus eros felis, in convallis eros tempus id. Nunc aliquam a sapien quis pharetra. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque purus. Maecenas cursus eros felis,
					in convallis.
				</div>
			</div>
			<div className="flex flex-wrap w-full h-1/5 gap-4 mb-8">
				<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] lg:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Overall Progress</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">
							<CountUp duration={1.3} decimals={1} end={20.2} />
							<span className="text-2xl font-bold">%</span>
						</h4>
						<div className="text-primary-focus text-3xl font-bold">
							<CountUp duration={1.3} end={698} />
							{" / "}
							<span className="text-sm font-bold text-neutral-content">
								<CountUp duration={1.3} end={3560} />
							</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content text-sm font-bold">resources</span>
					</div>
				</div>
				<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] lg:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Avg. Time per Resource</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<span className="text-3xl text-neutral-content font-bold">
							<CountUp duration={0.7} end={2} />
							<span className="text-2xl font-bold">m</span> <CountUp duration={1.3} end={39} />
							<span className="text-2xl font-bold">s</span>
						</span>
						<div className="text-error text-3xl font-bold">
							-<CountUp duration={1.3} end={35} />
							<span className="text-2xl font-bold">s</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content text-sm font-bold">slower</span>
					</div>
				</div>
				<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] lg:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Total Time</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<span className="text-3xl text-neutral-content font-bold">
							<CountUp duration={0.7} end={17} />
							<span className="text-2xl font-bold">h</span> <CountUp duration={1.3} end={23} />
							<span className="text-2xl font-bold">m</span>
						</span>
						<div className="text-success text-3xl font-bold">
							+<CountUp duration={1.3} end={35} />
							<span className="text-2xl font-bold">h</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content text-sm font-bold">since last week</span>
					</div>
				</div>
				<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] lg:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
					<h2 className="text-xl text-neutral-content">Total Reviewed</h2>
					<div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
					<div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
						<h4 className="text-3xl text-neutral-content font-bold">
							<CountUp duration={1.3} decimals={1} end={11.8} />
							<span className="text-2xl font-bold">%</span>
						</h4>
						<div className="text-primary-focus text-3xl font-bold">
							<CountUp duration={1.3} end={72} />
							{" / "}
							<span className="text-sm font-bold text-neutral-content">
								<CountUp duration={1.3} end={698} />
							</span>
						</div>
					</div>
					<div className="flex w-full h-full pr-4 justify-end align-items-center">
						<span className="text-neutral-content text-sm font-bold">labeled data</span>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap w-full gap-4 h-96">
				<div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
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

				<div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
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
				<div className="card flex flex-col w-full lg:w-[calc(50%_-_0.9rem)] xl:w-[calc(33%_-_0.8rem)] h-full p-4 bg-neutral-focus">
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
