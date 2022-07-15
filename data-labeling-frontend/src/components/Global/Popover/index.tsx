import React, { useState } from "react";
import { useOutsideClick } from "../../../hooks/outsideClick";
import { Alignment, Direction, PopoverProps } from "./types";
import "./styles/popover.scss";

const Popover = ({
	children,
	content = "Content is missing.",
	direction = Direction.Top,
	align = Alignment.Center,
}: PopoverProps) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const popoverClass = popoverOpen ? "Popover_open" : "Popover_closed";

	const handleOutsideClick = (e: Event) => {
		e.stopPropagation();
		setPopoverOpen(false);
	};

	const popoverRef = useOutsideClick(handleOutsideClick);
	return (
		<div ref={popoverRef} className="Popover_container">
			<div onClick={() => setPopoverOpen(!popoverOpen)}>{children}</div>
			<div className={`${popoverClass} ${direction}-${align}`}>{content}</div>
		</div>
	);
};

export default Popover;