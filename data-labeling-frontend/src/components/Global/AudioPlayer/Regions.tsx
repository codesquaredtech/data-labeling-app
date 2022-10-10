import React, { MutableRefObject, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../../config/store";
import { audioLabelingSliceSelectors, removeRegion, setIsPlaying } from "../../../slices/Labeling/audioSlice";

export default function Regions({ waveformRef }: { waveformRef: MutableRefObject<WaveSurfer | null> }) {
	const [loopedRegion, setLoopedRegion] = useState<string | null>(null);
	const regions = useSelector(audioLabelingSliceSelectors.regions);
	const dispatch = useDispatch<AppDispatch>();

	const handleRemoveRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId]?.remove();
		dispatch(removeRegion(regionId));
	};

	const handlePlayRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId]?.play();
		dispatch(setIsPlaying(true));
	};

	const handleLoopRegion = (regionId: string) => {
		if (loopedRegion === regionId) {
			waveformRef.current?.regions.list[regionId].setLoop(false);
			setLoopedRegion(null);
		} else {
			const regionList = waveformRef.current?.regions.list;
			for (const region in regionList) {
				if (region !== regionId) {
					regionList[region].setLoop(false);
				} else {
					regionList[region].setLoop(true);
					setLoopedRegion(regionId);
				}
			}
		}
	};

	return (
		<>
			{/* this solves TailwindCSS issue with dynamic classes */}
			{/* bg-lime-100 border-lime-500 bg-cyan-100 border-cyan-500 bg-rose-100 border-rose-500 */}
			{regions.map(({ color, start, end, id }, index) => (
				<div
					onDoubleClick={() => handlePlayRegion(id)}
					key={id}
					className={`rounded-sm shadow-xl mb-2 bg-${color}-100 border-l-8 border-${color}-500`}
				>
					<div className="flex justify-between items-center h-24">
						<div className="flex h-full align-items-center">
							<div className="flex align-items-start p-2 h-full">
								<button
									onClick={() => handleLoopRegion(id)}
									className={`btn btn-xs btn-circle focus:ring-0 ${
										id !== loopedRegion ? "btn-ghost" : "btn-warning"
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										fill="currentColor"
										className="bi bi-repeat"
										viewBox="0 0 16 16"
									>
										<path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
									</svg>
								</button>
							</div>
							<div className="text-neutral p-2 select-none">
								{index} Audio ({start} - {end})
							</div>
						</div>

						<div className="flex align-items-start p-2 h-full">
							<button
								onClick={() => handleRemoveRegion(id)}
								className="btn btn-xs btn-circle btn-outline btn-error"
							>
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
			))}
		</>
	);
}
