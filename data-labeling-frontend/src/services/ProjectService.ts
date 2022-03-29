import axios from "axios";
import { ProjectTemplate } from "../pages/AddProject";
import { ResourceTemplate } from "../pages/AddResourcePage";

export const ProjectService = {
    getProjects,
    getProjectById,
    getMetadataByProject,
    getUsersByProject,
    addProject,
    addMetadataToProject,
    removeMetadata,
    removeUser,
    getLabelingData,
    getProjectsByUser,
    getProjectResources,
    addResource
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

async function addProject(projekat: ProjectTemplate){
    return await axios.post("http://localhost:3030/project", projekat);
}

async function addMetadataToProject(id:any, metadata:any){
    return await axios.post(`http://localhost:3030/project/${id}/metadata`, metadata);

}

async function removeMetadata(removedto: any){
    return await axios.post("http://localhost:3030/project/remove-metadata", removedto);
}

async function removeUser(removedto:any){
    return await axios.post("http://localhost:3030/project/remove-user", removedto);
}

async function getLabelingData(id:string | undefined, resourceNumber: number){
    return await axios.get(`http://localhost:3030/project/${id}/label-project/${resourceNumber}`);

}

async function getProjectsByUser(id:string){
    return await axios.get(`http://localhost:3030/project/user-project/${id}`);
}

async function getProjectResources(id:string|undefined){
    return await axios.get(`http://localhost:3030/project/${id}/resources`);
}

async function addResource(id: string|undefined, body:ResourceTemplate[]){
    return await axios.post(`http://localhost:3030/project/${id}/resource`, body);
}


