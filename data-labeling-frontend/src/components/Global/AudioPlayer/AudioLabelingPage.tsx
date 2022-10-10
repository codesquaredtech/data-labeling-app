import React, { useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AudioPlayer } from ".";
import Regions from "./Regions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../config/store";
import { setActiveLabel } from "../../../slices/Labeling/audioSlice";

export type AudioLabel = {
	color: string;
	rgbColor: string;
	title: string;
	enabled: boolean;
};

export const AudioLabelingPage = () => {
	const [labels, setLabels] = useState([
		{ color: "lime", rgbColor: "190, 242, 99", title: "Speaker 1", enabled: false },
		{ color: "cyan", rgbColor: "102, 232, 249", title: "Speaker 2", enabled: false },
		{ color: "rose", rgbColor: "253, 164, 175", title: "Noise", enabled: false },
	]);
	const waveformRef = useRef<WaveSurfer | null>(null);
	const dispatch = useDispatch<AppDispatch>();

	const [listEl] = useAutoAnimate<HTMLDivElement>();

	const handleToggleLabel = (label: AudioLabel) => {
		dispatch(setActiveLabel(!label.enabled ? { ...label, enabled: true } : null));
		setLabels((prev) =>
			prev.map((l) => {
				if (l.title === label.title) {
					return { ...l, enabled: !l.enabled };
				}
				return { ...l, enabled: false };
			}),
		);
	};

	return (
		<div className="flex w-full h-full">
			<div className="flex flex-col w-full h-full pt-8 pb-8 pl-10 pr-10">
				<div>
					{/* this solves TailwindCSS issue with dynamic classes */}
					{/* bg-lime-300 bg-lime-500 bg-lime-700 border-lime-700 border-lime-900 bg-cyan-300 bg-cyan-500 bg-cyan-700 border-cyan-700 border-cyan-900 bg-rose-300 bg-rose-500 bg-rose-700 border-rose-700 border-rose-900 */}
					<div className="flex w-full mb-4 gap-3">
						{labels.map((label) => {
							const { color, title, enabled } = label;
							return (
								<div
									key={title}
									onClick={() => handleToggleLabel(label)}
									className={`flex px-3 py-1 items-center text-neutral text-sm border-l-4 cursor-pointer rounded-sm bg-${color}-${
										enabled ? 700 : 300
									} border-${color}-${enabled ? 900 : 700}`}
								>
									{title}
								</div>
							);
						})}
					</div>
					<AudioPlayer
						waveformRef={waveformRef}
						url="https://actions.google.com/sounds/v1/cartoon/whistle_toy.ogg"
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
					<Regions waveformRef={waveformRef} />
				</div>
			</div>
		</div>
	);
};
