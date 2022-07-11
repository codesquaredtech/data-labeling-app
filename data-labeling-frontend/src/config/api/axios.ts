import axios from "axios";
import { getToken } from "../../utils";

const axiosInstance = axios.create({});

// Dodaj token na svaki zahtev ka Sprints backendu, ako je korisnik ulogovan
axiosInstance.interceptors.request.use(function success(config) {
	const token = getToken();

	if (token) {
		(config.headers as any)["Authorization"] = "Bearer " + token;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	function success(response) {
		return response;
	},
	function failure(error) {
		const token = getToken();
		if (token) {
			if (error.response && error.response.status === 403) {
				localStorage.removeItem("jwt-token");
			}
		}
		throw error;
	},
);

export default axiosInstance;
