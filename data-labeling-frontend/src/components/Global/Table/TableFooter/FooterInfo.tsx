import React from "react";
import { FooterInfoProps } from "../types";

const FooterInfo = ({ footerText }: FooterInfoProps) => {
	return (
		<div className="flex align-middle">
			{footerText ? <div className="text-lg border-0">{footerText}</div> : null}
		</div>
	);
};

export default FooterInfo;
