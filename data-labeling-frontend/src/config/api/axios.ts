import axios from "axios";
import { getToken } from "../../utils";
import {logout} from "../../actions/auth";

const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3030';
const axiosInstance = axios.create({baseURL: backendUrl});

// Dodaj token na svaki zahtev ka Sprints backendu, ako je korisnik ulogovan
axiosInstance.interceptors.request.use(function success(config) {
	const token = getToken();

	if (token) {
		(config.headers as any)["Authorization"] = "Bearer " + token;
	}
	return config;
});

export const setupAxiosInterceptors = (navigate: any, dispatch: any) => {
	axiosInstance.interceptors.response.use(
		function success(response) {
			return response;
		},
		function failure(error) {
			const token = getToken();
			if (token) {
				if (error.response && [403, 401].includes(error.response.status)) {
					localStorage.removeItem("jwt-token");
					dispatch(logout());
					navigate('/login')
				}
			}
			throw error;
		},
	);
};

export default axiosInstance;
