import { ReactChild, ReactElement } from "react";

export type PopoverProps = {
	children: ReactChild;
	content?: ReactElement | string;
	direction?: Direction;
	align?: Alignment;
};

export enum Direction {
	Top = "top",
	Bottom = "bottom",
	Left = "left",
	Right = "right",
}

export enum Alignment {
	Start = "start",
	Center = "center",
	End = "end",
}
