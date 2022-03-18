import React, { useEffect, useState } from 'react'
import { Container, Table} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProjectService } from '../services/ProjectService';

export interface INumber{
    identNumber:string
}

const Users: React.FC<INumber> = ({ identNumber }) => {

    const [users, setUsers] = useState<any[]>([]);


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


  return (

    <Container style={{ textAlign: "center"}} >
    <h5>Додати корисници</h5>
    <Table bordered striped>
      <thead className='thead-dark'>
        <tr>
          <th>Име</th>
          <th>Презиме</th>
          <th>Корисничко име</th>

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



                </tr>
              )
            })

          }
      </tbody>
    </Table>

  </Container>
      


  )
}

export default Users;
