import { useRef, useEffect } from "react";

export const useOutsideClick = (callback: (param?: any) => void) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClick = (event: Event) => {
			if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
				callback();
			}
		};

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [callback, ref]);

	return ref;
};
