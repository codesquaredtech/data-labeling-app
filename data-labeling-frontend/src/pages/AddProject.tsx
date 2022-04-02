import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import Users from '../components/Users';
import { ProjectService } from '../services/ProjectService';
import { UserService } from '../services/UserService';

export interface ProjectTemplate{
    identNumber: string;
    title: string;
    description:string;
    users: string[];
}


export const AddProject = () => {

    const [project, setProject] = useState<ProjectTemplate>({
        identNumber: "",
        title: "",
        description : "",
        users: []
    });


    const [users,setUsers] = useState<any[]>([]);

    useEffect(()=> {
        fetchUsers();

    },[]);


    async function fetchUsers(){
        try{
            const response = await UserService.getAll();
            setUsers(response.data);
        }catch(e){
            console.error("Error while getting api")
          }
    }

    async function addToLabelars(id: string){
        project.users.push(id);
        setUsers((user) => users.filter((user) => user._id !== id));
    }


    const handleFormInputChange=(name:any)=>(event:any)=>{
        const val = event.target.value;
        setProject({ ...project, [name]: val });
    }


    const sendRequest = async () => {

        if(project.description !== "" && project.title !== ""  && project.users.length != 0){
            project.identNumber = (Math.random() + 1).toString(36).substring(7);
            await ProjectService.addProject(project);
            window.location.replace("/project/metadata/" + project.identNumber);

        }else{
            alert("Polja nisu uredu!")
        }
    }



  return (
      <>
        <Container>
            <Col md = {{span:6, offset:3}} style={{textAlign:"center"}}>
                <h2>Додавање новог пројекта</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Наслов пројекта</Form.Label>
                        <Form.Control
                                type="text"
                                name="title"
                                value={project.title}
                                onChange={handleFormInputChange("title")}
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Опис пројекта</Form.Label>
                        <Form.Control
                                type="text"
                                name="description"
                                value={project.description}
                                onChange={handleFormInputChange("description")}
                            />
                    </Form.Group>


                    <Table bordered striped>
                        <thead className='thead-dark'>
                        <tr>
                            <th>Корисничко име</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.length ===0 ? 
                            <tr>
                                <td>{users.length}= No projects added!</td>
                            </tr> :
                            users.map((user)=> {
                                return (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>
                                            <Button
                                                variant="info"
                                                onClick={() => addToLabelars(user._id)}
                                            >
                                                Прикључи
                                            </Button>
                                        </td>


                                </tr>
                                )
                            })

                            }
                        </tbody>
                </Table>


                    <Button style={{marginTop:"20px"}} variant='info' onClick={sendRequest}>
                        Унеси нови пројекат
                    </Button>

                </Form>
            </Col>
        </Container>



      </>
  )
}
