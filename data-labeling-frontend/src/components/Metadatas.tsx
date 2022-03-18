import React, { useEffect, useState } from 'react'
import { Container, Table} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProjectService } from '../services/ProjectService';


export interface INumber{
    identNumber:string
}

const Metadatas: React.FC<INumber> = ({ identNumber }) => {

    const [metadatas, setMetadatas] = useState<any[]>([]);


    useEffect(() => {
        fetchMetadatas(identNumber)

    },[])

    async function fetchMetadatas(id:string) {
        try{
          const response = await ProjectService.getMetadataByProject(id);
          console.log(response.data);
          setMetadatas(response.data);
        }catch(e){
          console.error("Error while getting api")
        }
        
      }


  return (

    <Container style={{ textAlign: "center"}}>
    <h5>Додати метаподаци</h5>
    <Table bordered striped>
      <thead className='thead-dark'>
        <tr>
          <th>Назим метаподатка</th>
          <th>Тип метаподатка</th>
        </tr>
      </thead>
      <tbody>
          {metadatas.length ===0 ? 
            <tr>
              <td>{metadatas.length}= No projects added!</td>
            </tr> :
            metadatas.map((m)=> {
              return (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.type}</td>


                </tr>
              )
            })

          }
      </tbody>
    </Table>

  </Container>
      


  )
}

export default Metadatas