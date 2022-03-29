import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Metadatas from '../components/Metadatas';
import { ProjectService } from '../services/ProjectService';
import Users from '../components/Users';
import ResourceTable from '../components/ResourcesTable';

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

    let idProject:string = id as string;



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
            <h3/>

        <Row>
            <Col>
            <Metadatas identNumber = {idProject}/>

            </Col>
            <Col>
            <Users identNumber = {idProject}/>

            </Col>
        </Row>
        <h4>Ресурси</h4>
        <ResourceTable identNumber = {idProject}/>






    </Container>

    </>

  )
}
