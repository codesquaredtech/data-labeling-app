export const TokenService = {
    getToken,

};

function getToken() {
    return localStorage.getItem("jwt-token");
}

