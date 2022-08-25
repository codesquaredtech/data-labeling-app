import React from "react";
import { useDropzone } from "react-dropzone";
import { formatBytes } from "../../../utils";

export const Dropzone = ({ onDrop }: { onDrop: (acceptedFiles: File[]) => void }) => {
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".gif", ".jpeg", ".jpg"],
			"audio/*": [".mp3", ".mp4", ".wav", ".ogg"],
		},
		maxSize: 20000000, // 20MB
	});

	return (
		<div className="container">
			<div
				{...getRootProps()}
				className="flex w-full h-52 justify-center items-center border-2 border-dashed border-primary-focus mb-4"
			>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<div className="flex flex-col w-full">
				{acceptedFiles.length > 0 && (
					<div className="mb-4">
						<h4 className="text-lg mb-1">Files</h4>
						<ul>
							{acceptedFiles.map((file: File) => (
								<li key={file.name}>
									{file.name} - {formatBytes(file.size)}
								</li>
							))}
						</ul>
					</div>
				)}
				{fileRejections.length > 0 && (
					<>
						<h4 className="text-lg text-error mb-1">Rejected Files</h4>
						<ul>
							{fileRejections.map((rejection: any) => (
								<li key={rejection.file.name}>
									{rejection.file.name} -{" "}
									<span className="text-error">
										{rejection.errors.map((error: any) => error.message)}
									</span>
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};
