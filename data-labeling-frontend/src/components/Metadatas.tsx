import React, { useEffect, useState } from 'react'
import { Container, Table, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProjectService } from '../services/ProjectService';


export interface INumber{
    identNumber:string
}

export interface deleteDto{
  projectId:string,
  metadataId: string

}

const Metadatas: React.FC<INumber> = ({ identNumber }) => {

    const [metadatas, setMetadatas] = useState<any[]>([]);
    const [deletemetadata, setDeletemetadata] = useState<deleteDto>({
      projectId:"",
      metadataId:""
    });


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


    async function removeFromProject(id:string){
      deletemetadata.metadataId = id;
      deletemetadata.projectId = identNumber;
      setMetadatas((m) => metadatas.filter((m) => m._id !== id));
      return await ProjectService.removeMetadata(deletemetadata);

    }


  return (

    <Container style={{ textAlign: "center"}}>
    <h5>Додати метаподаци</h5>
    <Table bordered striped>
      <thead className='thead-dark'>
        <tr>
          <th>Назим метаподатка</th>
          <th>Тип метаподатка</th>
          <th>Уклони</th>

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
                  <td>
                    <Button variant="link" onClick={()=> removeFromProject(m._id)}>Уклони</Button>
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

export default Metadatas