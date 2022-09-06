import { ReactChild } from "react";

export type ModalProps = {
	setOpen: (open: boolean) => void;
	onClose?: () => void;
	open: boolean;
	visibleOverflow?: boolean;
	title?: string;
	buttonTitle?: string;
	buttonColor?: string;
	name?: string;
	closeButton?: boolean;
	hideButton?: boolean;
	children: ReactChild;
};
