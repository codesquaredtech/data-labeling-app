import React, { useRef, forwardRef, useEffect } from "react";
import { TableCheckboxProps } from "../types";

const TableCheckbox = forwardRef<HTMLInputElement, TableCheckboxProps>(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef(null);
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		// @ts-ignore
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type="checkbox" ref={resolvedRef} {...rest} />
		</>
	);
});

export default TableCheckbox;
