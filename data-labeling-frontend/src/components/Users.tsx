import React, { useEffect, useState } from 'react'
import { Container, Table, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProjectService } from '../services/ProjectService';
import { deleteDto } from './Metadatas';

export interface INumber{
    identNumber:string
}



const Users: React.FC<INumber> = ({ identNumber }) => {

    const [users, setUsers] = useState<any[]>([]);
    const[deleteUser, setDeleteuser] = useState<deleteDto>({
      projectId:"",
      metadataId:""
    })


    useEffect(() => {
        fetchMetadatas(identNumber)

    },[])

async function fetchMetadatas(id:string) {
  try{
    const response = await ProjectService.getUsersByProject(id);
    console.log(response.data);
    setUsers(response.data);
    }catch(e){
        console.error("Error while getting api")
      }
        
  }


  async function removeUserFromProject(id:string){

    deleteUser.metadataId = id;
    deleteUser.projectId = identNumber;
    setUsers((user)=> users.filter((user)=> user._id !== id));
    return await ProjectService.removeUser(deleteUser);
    
  }


  return (

    <Table bordered striped>
      <thead className='thead-dark'>
        <tr>
          <th>Име</th>
          <th>Презиме</th>
          <th>Корисничко име</th>
          <th>Акција</th>

        </tr>
      </thead>
      <tbody>
          {users.length ===0 ? 
            <tr>
              <td>{users.length}= No users added!</td>
            </tr> :
            users.map((user)=> {
              return (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>
                    <Button variant="link" onClick={()=> removeUserFromProject(user._id)}>Уклони</Button>
                  </td>
                </tr>
              )
            })

          }
      </tbody>
    </Table>

      


  )
}

export default Users;
