import axios from "axios";
import { TokenService } from "../TokenService";


const LabelingAxiosClient = axios.create({});



// Dodaj token na svaki zahtev ka Sprints backendu, ako je korisnik ulogovan
LabelingAxiosClient.interceptors.request.use(function success(config) {
    const token = TokenService.getToken();
    console.log(token)

    if (token) {
        (<any> config.headers)["Authorization"] = "Bearer " + token;
    }
    return config;
});


LabelingAxiosClient.interceptors.response.use(

    function success(response){
        return response;
    },
    function failure(error){
        const token = TokenService.getToken();
        if(token){
            if (error.response && error.response.status === 403) {
                localStorage.removeItem("jwt-token");
                window.location.assign("/");

            }
        }
        throw error;
    }
);

export default LabelingAxiosClient;