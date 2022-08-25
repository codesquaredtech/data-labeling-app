export const getToken = () => {
	return localStorage.getItem("jwt-token");
};

export const getRole = () => {
	return localStorage.getItem("role");
};

export const getTheme = () => {
	return localStorage.getItem("theme") || "night";
};

export const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
