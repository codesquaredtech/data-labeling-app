import React from "react";
import { FooterInfoProps } from "../types";

const FooterInfo = ({ footerText }: FooterInfoProps) => {
	return <div>{footerText ? <div className="footer-text">{footerText}</div> : null}</div>;
};

export default FooterInfo;
