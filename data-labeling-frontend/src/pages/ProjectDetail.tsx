import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Metadatas from '../components/Metadatas';
import { ProjectService } from '../services/ProjectService';
import Users from '../components/Users';

export interface IProject{
    identNumber:"",
    title:string,
    description:string,
    inputFile:string
}


export const ProjectDetail = () => {

    const [project,setProject] = useState<IProject>({
        identNumber:"",
        title:"",
        description:"",
        inputFile:""
    });

    const {id} = useParams();

    const [ident, setIdent] = useState("");

    let bla1:string = id as string;



    useEffect(() => {
        fetchProject(id);
        
    },[id])


    async function fetchProject(id:any){
        console.log(id);
        try{
            const response = await ProjectService.getProjectById(id);
            setProject(response.data);
        }catch(error){
            console.error("Greska")
        }

    }






  return (
      <>
    <Container style={{marginTop:"25px"}} >
        <h3>{project.title}</h3>
        <p><i>{project.description}</i></p>


        <p style={{marginTop:"25px"}}>{project.inputFile}</p>


        <Metadatas identNumber = {bla1}/>
        <Users identNumber = {bla1}/>


    </Container>

    </>

  )
}
