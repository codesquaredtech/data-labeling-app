export const getToken = () => {
	return localStorage.getItem("jwt-token");
};

export const getTheme = () => {
	return localStorage.getItem("theme") || "night";
};
