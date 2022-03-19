import axios from "axios"

export const UserService = {
    getAll
}


async function getAll(){
    return await axios.get("http://localhost:3030/user/all")
}