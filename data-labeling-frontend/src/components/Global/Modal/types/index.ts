import { ReactChild } from "react";

export type ModalProps = {
	title?: string;
	buttonTitle?: string;
	name?: string;
	closeButton?: boolean;
	children: ReactChild;
};
