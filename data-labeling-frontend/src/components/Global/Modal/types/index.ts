import { ReactChild } from "react";

export type ModalProps = {
	setOpen: (open: boolean) => void;
	open: boolean;
	title?: string;
	buttonTitle?: string;
	buttonColor?: string;
	name?: string;
	closeButton?: boolean;
	hideButton?: boolean;
	children: ReactChild;
};
