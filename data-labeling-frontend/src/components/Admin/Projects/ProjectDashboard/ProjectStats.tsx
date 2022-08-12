import React from "react";
import CountUp from "react-countup";

export default function ProjectStats() {
	return (
		<div className="flex flex-wrap w-full gap-4 mb-8">
			<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
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
			<div className="card flex flex-col w-full  md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
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
			<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
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
			<div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
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
	);
}
