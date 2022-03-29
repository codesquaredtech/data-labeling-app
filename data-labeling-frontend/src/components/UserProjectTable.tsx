import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { ProjectService } from '../services/ProjectService';
import axios from "axios";
import { ProjectDetail } from '../pages/ProjectDetail';


export const UserProjectTable = () => {

  const[projects, setProjects] = useState<any[]>([]);



  useEffect(()=> {
    fetchProjects();

  },[])


  async function fetchProjects() {
    try{
      const response = await ProjectService.getProjectsByUser("62331a874b920f5e9e4f7ee8")
      console.log(response.data);
      setProjects(response.data);
    }catch(e){
      console.error("Error while getting api")
    }
    
  }








  return (
    <Container>
      <Table bordered striped>
        <thead className='thead-dark'>
          <tr>
            <th>Наслов пројекта</th>
            <th>Опис</th>
            <th>Више</th>
          </tr>
        </thead>
        <tbody>
            {projects.length ===0 ? 
              <tr>
                <td>{projects.length}= No projects added!</td>
              </tr> :
              projects.map((project)=> {
                return (
                  <tr key={project.identNumber}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>
                    <a href={project.identNumber+"/labeling-data"}>Лабелирај</a>
                    </td>

                  </tr>
                )
              })

            }
        </tbody>
      </Table>

    </Container>
  )
}
