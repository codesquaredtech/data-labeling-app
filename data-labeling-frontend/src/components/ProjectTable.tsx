import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { ProjectService } from '../services/ProjectService';
import axios from "axios";
import { ProjectDetail } from '../pages/ProjectDetail';


export const ProjectTable = (props: any) => {

  const[projects, setProjects] = useState<any[]>([]);



  useEffect(()=> {
    fetchProjects();

  },[])


  async function fetchProjects() {
    try{
      const response = await ProjectService.getProjects();
      console.log(response.data);
      setProjects(response.data);
    }catch(e){
      console.error("Error while getting api")
    }
    
  }








  return (
    <Container>
      <h1>Сви пројекти</h1>
      <button onClick={props.onResourceFilled}>Primer</button>
      <Table bordered striped>
        <thead className='thead-dark'>
          <tr>
            <th>Наслов пројекта</th>
            <th>Опис</th>
            <th>Број лабелара</th>
            <th>Број метаподатака</th>
            <th>Ресурси</th>
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
                    <td>{project.users.length}</td>
                    <td>{project.metadata.length}</td>
                    <td>
                    <a href={/project/+ project.identNumber}>Детаљи</a>
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
