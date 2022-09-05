import React from "react";
import StatsCard from "./StatsCard";

export default function ProjectStats() {
	return (
		<div className="flex flex-wrap w-full gap-4 mb-8">
			<StatsCard
				title={"Overall Progress"}
				type={"percentage"}
				countupDuration={1.3}
				currentValue={698}
				totalValue={3560}
				extraText={'resources'}
			/>
			<StatsCard
				title={"Avg. Time per Resource"}
				type={"time"}
				countupDuration={1.3}
				minutes={2}
				seconds={39}
				progressValue={35}
				progressTimeUnit={"s"}
				extraText={'slower'}
			/>
			<StatsCard
				title={"Total Time"}
				type={"time"}
				countupDuration={1.3}
				hours={17}
				minutes={23}
				progressValue={35}
				progressTimeUnit={"h"}
				extraText={'since last week'}
			/>
			<StatsCard
				title={"Total Reviewed"}
				type={"percentage"}
				countupDuration={1.3}
				currentValue={72}
				totalValue={698}
				extraText={'labeled data'}
			/>
		</div>
	);
}
