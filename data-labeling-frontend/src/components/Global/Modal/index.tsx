import React from "react";
import { ModalProps } from "./types";

export default function Modal({
	title = "",
	buttonTitle = "open modal",
	name = "",
	closeButton = false,
	children,
}: ModalProps) {
	return (
		<>
			<label htmlFor={`modal-${name}`} className="btn btn-primary modal-button">
				{buttonTitle}
			</label>
			<input type="checkbox" id={`modal-${name}`} className="modal-toggle" />
			<label htmlFor={`modal-${name}`} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<div className="text-xl text-base-content absolute left-6 top-4">{title}</div>
					<div className="divider mt-4 before:bg-gradient-to-r before:from-primary before:to-base-100 after:bg-transparent" />
					{closeButton && (
						<label htmlFor={`modal-${name}`} className="btn btn-sm btn-circle absolute right-4 top-4">
							✕
						</label>
					)}
					<div className="mt-6">{children}</div>
				</label>
			</label>
		</>
	);
}
