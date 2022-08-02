export const getToken = () => {
	return localStorage.getItem("jwt-token");
};

export const getRole = () => {
	return localStorage.getItem("role");
};

export const getTheme = () => {
	return localStorage.getItem("theme") || "night";
};
