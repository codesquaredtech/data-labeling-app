import axios from "axios";

export const ProjectService = {
    getProjects,
    getProjectById,
    getMetadataByProject,
    getUsersByProject
}

async function getProjects(){
    return await axios.get("http://localhost:3030/project/all");
}

async function getProjectById(id:string | undefined){
    return await axios.get(`http://localhost:3030/project/${id}`)

}

async function getMetadataByProject(id:any){
    return await axios.get("http://localhost:3030/project/"+ id + "/metadata")
}

async function getUsersByProject(id:any){
    return await axios.get("http://localhost:3030/project/"+ id + "/users")
}


