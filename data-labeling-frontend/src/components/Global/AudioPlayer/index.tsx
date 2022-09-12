import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import WaveformRegionsPlugin from "wavesurfer.js/src/plugin/regions";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline";
import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
import { FaPlay, FaPause, FaVolumeMute, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";
import daisyuiColors from "daisyui/src/colors/themes";
import { getTheme } from "../../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../config/store";
import { addRegion } from "../../../slices/Labeling/audioSlice";

const PLAYBACK_SPEED_OPTIONS = [0.25, 0.5, 1, 1.5, 2];

export const AudioPlayer = ({
	url,
	activeLabelColor,
	zoomEnabled = false,
}: {
	url: string;
	activeLabelColor?: { color: string; rgbColor: string };
	zoomEnabled?: boolean;
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const waveformRef = useRef<WaveSurfer | null>(null);
	const theme = getTheme();
	const themeColors = daisyuiColors[`[data-theme=${theme}]`];
	const primaryColor = themeColors.primary;
	const primaryFocusColor = themeColors["primary-focus"];
	const dispatch = useDispatch<AppDispatch>();

	// it will trigger on initial render and on every update of the url prop or theme
	useEffect(() => {
		setIsPlaying(false);
		waveformRef.current?.destroy();
		waveformRef.current = null;
		waveformRef.current = WaveSurfer.create({
			container: "#waveform",
			progressColor: primaryColor,
			// barGap: 2,
			// barWidth: 3,
			// barRadius: 3,
			barHeight: 3,
			cursorWidth: 2,
			cursorColor: primaryColor,
			backgroundColor: primaryFocusColor,
			responsive: true,
			// add plugins
			plugins: [
				WaveformRegionsPlugin.create({ maxLength: 90 }),
				TimelinePlugin.create({
					container: "#wave-timeline",
					primaryFontColor: "#ffffff",
					secondaryFontColor: "#ffffff",
					unlabeledNotchColor: primaryFocusColor,
				}),
				CursorPlugin.create({
					color: primaryColor,
				}),
			],
		});
		// load the audio file
		waveformRef.current.load(url);

		waveformRef.current.on("finish", (e) => {
			setIsPlaying(false);
		});

		// Enable dragging on the audio waveform
		waveformRef.current.enableDragSelection({
			maxLength: 90,
		});
		// Perform action when new region is created
	}, [primaryColor, primaryFocusColor, url]);

	useEffect(() => {
		if (waveformRef.current && activeLabelColor) {
			waveformRef.current.on("region-created", (e) => {
				// let color = randomColor({
				// 	luminosity: "light",
				// 	alpha: 0.3,
				// 	format: "rgba",
				// });
				e.color = `rgb(${activeLabelColor.rgbColor}, 0.3)`;
				dispatch(addRegion({ id: e.id, color: activeLabelColor.color }));
			});
		}
	}, [dispatch, activeLabelColor]);

	// handle key events
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === " ") {
				handlePlayPauseAudio();
			}
			if (e.key === "ArrowLeft") {
				handleSkipAudio(false);
			}
			if (e.key === "ArrowRight") {
				handleSkipAudio(true);
			}
			if (e.key === "m") {
				handleToggleMute();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isPlaying]);

	// delete a particular region
	const deleteRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId].remove();
	};

	// play a particular region
	const playRegion = (regionId: string) => {
		waveformRef.current?.regions.list[regionId].play();
	};

	const handlePlayPauseAudio = () => {
		if (waveformRef.current) {
			waveformRef.current.playPause();
			setIsPlaying(waveformRef.current.isPlaying());
		}
	};

	const handleSkipAudio = (isForward: boolean) => {
		if (waveformRef.current) {
			waveformRef.current.skip(isForward ? 2 : -2);
		}
	};

	const handleToggleMute = () => {
		if (waveformRef.current) {
			waveformRef.current.toggleMute();
			setIsMuted(waveformRef.current.getMute());
		}
	};

	const handleChangePlaybackSpeed = (speed: number) => {
		if (waveformRef.current) {
			waveformRef.current.setPlaybackRate(speed);
		}
	};

	const handleZoom = (zoom: number, isHorizontal = true) => {
		if (waveformRef.current) {
			if (isHorizontal) {
				waveformRef.current.zoom(zoom);
			} else {
				waveformRef.current.params.barHeight = zoom;
				// waveformRef.current.empty();
				waveformRef.current.drawBuffer();
			}
		}
	};

	return (
		<div className="flex flex-col w-full bg-neutral p-4 rounded-sm">
			<div className="flex w-full">
				<div className="w-full">
					<div id="waveform" />
					<div id="wave-timeline" className="mt-2 mb-4" />
				</div>
				{zoomEnabled && (
					<div className="w-[30px] rotate-270 mt-14">
						<input
							type="range"
							min="3"
							max="50"
							defaultValue={0}
							onChange={(e) => handleZoom(Number(e.target.value), false)}
							className="range range-primary range-xs w-32 -ml-10 -rotate-90"
						/>
					</div>
				)}
			</div>
			{zoomEnabled && (
				<div className="flex items-center mb-8">
					<input
						type="range"
						min="50"
						max="500"
						defaultValue={0}
						onChange={(e) => handleZoom(Number(e.target.value))}
						className="range range-primary range-xs"
					/>
				</div>
			)}
			<div className="flex justify-between items-center">
				<select
					onChange={(e) => {
						const value = e.target.value;
						handleChangePlaybackSpeed(Number(value));
					}}
					defaultValue={1}
					className="select select-link"
				>
					{PLAYBACK_SPEED_OPTIONS.map((option: number) => {
						return (
							<option value={option} key={option}>
								{option}
							</option>
						);
					})}
				</select>
				<div className="flex justify-center items-center gap-2">
					<button className="btn btn-circle btn-primary" onClick={() => handleSkipAudio(false)}>
						<FaBackward />
					</button>
					<button className="btn btn-circle btn-primary btn-lg" onClick={handlePlayPauseAudio}>
						{isPlaying ? <FaPause /> : <FaPlay />}
					</button>
					<button className="btn btn-circle btn-primary" onClick={() => handleSkipAudio(true)}>
						<FaForward />
					</button>
				</div>
				<button className="btn btn-circle btn-primary" onClick={handleToggleMute}>
					{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
				</button>
			</div>
		</div>
	);
};
