import React, { useEffect, useState } from 'react'
import { ProjectService } from '../services/ProjectService';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const ResourceTable = (props: any) => {

    const[resources, setResources] = useState<any[]>([]);


    useEffect(() => {
      fetchResources();

    },[])

  

    async function fetchResources(){
        try{
            const response = await ProjectService.getProjectResources(props.identNumber);
            setResources(response.data);
        }catch(e){
            console.error("Error!")
        }
    }

  async function showText(){
      return <div>Hello</div>
  }

  return (
    <Table bordered striped>
      <thead className='thead-dark'>
        <tr>
          <th>Наслов ресурса</th>
          <th>Текст ресурса</th>
        </tr>
      </thead>
      <tbody>
          {resources.length ===0 ? 
            <tr>
              <td>{resources.length}= No projects added!</td>
            </tr> :
            resources.map((r)=> {
              return (
                <tr key={r._id}>
                  <td>{r.title}</td>
                  <td>{r.text}</td>

                </tr>
              )
            })

          }
      </tbody>
    </Table>

        
  )
}

export default ResourceTable;
