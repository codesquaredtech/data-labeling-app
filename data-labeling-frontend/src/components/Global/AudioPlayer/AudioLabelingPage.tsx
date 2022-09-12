import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AudioPlayer } from ".";
import { audioLabelingSliceSelectors } from "../../../slices/Labeling/audioSlice";

export const AudioLabelingPage = () => {
	const regions = useSelector(audioLabelingSliceSelectors.regions);
	const [labels, setLabels] = useState([
		{ color: "lime", rgbColor: "190, 242, 99", title: "Speaker 1", enabled: false },
		{ color: "cyan", rgbColor: "102, 232, 249", title: "Speaker 2", enabled: false },
		{ color: "rose", rgbColor: "253, 164, 175", title: "Noise", enabled: false },
	]);
	const activeLabel = useMemo(() => {
		return labels.find((label) => label.enabled);
	}, [labels]);

	const [listEl] = useAutoAnimate<HTMLDivElement>();

	const handleToggleLabel = (label: string) => {
		setLabels((prev) =>
			prev.map((l) => {
				if (l.title === label) {
					return { ...l, enabled: !l.enabled };
				}
				return { ...l, enabled: false };
			}),
		);
	};

	console.log("labels :>> ", labels);

	return (
		<div className="flex w-full h-full">
			<div className="flex flex-col w-full h-full pt-8 pb-8 pl-10 pr-10">
				<div>
					<div className="flex w-full mb-4 gap-3">
						{labels.map(({ color, title, enabled }) => (
							<div
								onClick={() => handleToggleLabel(title)}
								className={`flex px-3 py-1 items-center text-neutral text-sm border-l-4 cursor-pointer rounded-sm bg-${color}-${
									enabled ? 700 : 300
								} border-${color}-${enabled ? 900 : 700}`}
							>
								{title}
							</div>
						))}
					</div>
					<AudioPlayer
						url="https://actions.google.com/sounds/v1/cartoon/whistle_toy.ogg"
						activeLabelColor={
							activeLabel ? { color: activeLabel.color, rgbColor: activeLabel.rgbColor } : undefined
						}
						zoomEnabled
					/>
				</div>
				<div className="mt-4">
					<label className="label">
						<span className="label-text">Transcribe audio:</span>
					</label>
					<textarea className="textarea textarea-bordered w-full h-56" />
				</div>
			</div>
			<div className="flex flex-col bg-neutral h-[calc(100vh_-_64px)] w-1/3">
				<div className="flex w-full items-center justify-between py-8 px-4 bg-neutral-focus">
					<span className="text-neutral-content">Audio file.wav (0:00 / 2:20)</span>
				</div>
				<div ref={listEl} className="overflow-y-auto w-full py-4 px-3">
					{regions.map(({ color }, i) => (
						<div key={i} className={`rounded-sm shadow-xl mb-2 bg-${color}-500`}>
							<div className="flex justify-between items-center h-24">
								<div className="text-neutral p-3">Region {i}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
