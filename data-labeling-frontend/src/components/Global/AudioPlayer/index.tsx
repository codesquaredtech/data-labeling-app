import React, { useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import WaveformRegionsPlugin from "wavesurfer.js/src/plugin/regions";
import { FaPlay, FaPause } from "react-icons/fa";
import daisyuiColors from "daisyui/src/colors/themes";
import { getTheme } from "../../../utils";

export const AudioPlayer = ({ url }: { url: string }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const waveformRef = useRef<WaveSurfer | null>(null);
	const theme = getTheme();
	const primaryColor = daisyuiColors[`[data-theme=${theme}]`].primary;
	const accentColor = daisyuiColors[`[data-theme=${theme}]`].accent;

	useEffect(() => {
		if (!waveformRef.current) {
			waveformRef.current = WaveSurfer.create({
				container: "#waveform",
				waveColor: primaryColor,
				barGap: 2,
				barWidth: 3,
				barRadius: 3,
				cursorWidth: 2,
				cursorColor: primaryColor,
				// Add the regions plugin.
				// More info here https://wavesurfer-js.org/plugins/regions.html
				plugins: [WaveformRegionsPlugin.create({ maxLength: 90 })],
			});
			waveformRef.current.load(url);

			// Enable dragging on the audio waveform
			waveformRef.current.enableDragSelection({
				maxLength: 90,
			});
			// Perform action when new region is created
			waveformRef.current?.on("region-created", (e) => {
				// let color = randomColor({
				// 	luminosity: "light",
				// 	alpha: 0.3,
				// 	format: "rgba",
				// });
				// e.color = color;
			});
		}
	}, [primaryColor, url]);

	// delete a particular region
	const deleteRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId].remove();
	};

	// play a particular region
	const playRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId].play();
	};

	const playAudio = () => {
		if (waveformRef.current?.isPlaying()) {
			waveformRef.current.pause();
		} else {
			waveformRef.current?.play();
		}
		setIsPlaying((prevState) => !prevState);
	};

	return (
		<div className="flex flex-col w-full bg-neutral gap-2 p-4">
			<div id="waveform" />
			<div className="flex justify-center">
				<button className="btn btn-circle btn-primary" onClick={playAudio}>
					{isPlaying ? <FaPause /> : <FaPlay />}
				</button>
			</div>
		</div>
	);
};
