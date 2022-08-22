import React from "react";
import { AudioPlayer } from ".";

export const ExamplePage = () => {
	return (
		<div className="w-2/3 h-screen flex justify-center items-center">
			<AudioPlayer url="https://actions.google.com/sounds/v1/cartoon/whistle_toy.ogg" />
		</div>
	);
};
