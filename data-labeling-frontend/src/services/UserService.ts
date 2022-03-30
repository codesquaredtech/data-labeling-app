import axios from "axios"
import LabelingAxiosClient from "./clients/LabelingAxiosClient"

export const UserService = {
    getAll
}


async function getAll(){
    return await LabelingAxiosClient.get("http://localhost:3030/user/all")
}