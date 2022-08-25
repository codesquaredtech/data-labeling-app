import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AudioPlayer } from ".";
import { uploadResources } from "../../../actions/resource";
import { AppDispatch } from "../../../config/store";
import { Dropzone } from "../Dropzone";

export const ExamplePage = () => {
	const [files, setFiles] = useState<File[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	const onDrop = useCallback((acceptedFiles) => {
		console.log("acceptedFiles :>> ", acceptedFiles);
		setFiles(acceptedFiles);
	}, []);

	const handleUpload = () => {
		dispatch(uploadResources({ projectId: "525ge", files }));
	};

	return (
		<div className="w-2/5 h-screen flex flex-col justify-center items-center gap-12">
			<AudioPlayer url="https://actions.google.com/sounds/v1/cartoon/whistle_toy.ogg" zoomEnabled />

			<Dropzone onDrop={onDrop} />
			<button className="btn btn-primary" disabled={files.length < 1} onClick={handleUpload}>
				Upload
			</button>
		</div>
	);
};
