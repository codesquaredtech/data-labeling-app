import React, { useState } from 'react'
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProjectService } from '../services/ProjectService';


export interface ResourceTemplate {

  title: string;
  text: string;

}


export const AddResourcePage = (props: any) => {

  const [resource, setResource] = useState<ResourceTemplate>({

    title: "",
    text: "",

  });

  const [resourceList, setResourceList] = useState<any[]>([]);

  const { id } = useParams();


  const handleFormInputChange = (name: any) => (event: any) => {
    const val = event.target.value;
    setResource({ ...resource, [name]: val });
  }

  const cleanFields = () => {
    setResource({
      title: "",
      text: "",
    })

  }


  const sendToServer = async () => {
    return ProjectService.addResource(id, resourceList);
  }

  const sendRequest = async () => {
    if (resource.title !== "" && resource.text !== "") {
      const newList = resourceList.concat(resource);
      setResourceList(newList);
      cleanFields();

    } else {
      alert("Polja nisu uredu!")
    }



  }




  return (
    <>

      <Container>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Нови ресурс</h2>
          <Form>
            <Form.Group>
              <Form.Label>Наслов</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={resource.title}
                onChange={handleFormInputChange("title")}


              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Текст</Form.Label>
              <Form.Control
                as="textarea" rows={2}
                type="text"
                name="text"
                value={resource.text}
                onChange={handleFormInputChange("text")}


              />
            </Form.Group>



          </Form>



          <Table style={{marginTop:"30px"}} bordered striped>
            <thead className='thead-dark'>
              <tr>
                <th>Назив </th>
                <th>Тип податка</th>
              </tr>
            </thead>
            <tbody>
              {resourceList.length === 0 ?
                <tr>
                  <td>{resourceList.length}= No projects added!</td>
                </tr> :
                resourceList.map((r) => {
                  return (
                    <tr key={r.title}>
                      <td>{r.title}</td>
                      <td>{r.text}</td>
                    </tr>
                  )
                })

              }
            </tbody>
          </Table>




          <div style={{textAlign:"center", backgroundColor:"white"}}>
            <Button style={{ marginTop: "20px" }} variant='info' onClick={sendRequest}>
              Унеси resurs
            </Button>
            <br />

            <a onClick={sendToServer} href={"/project/" + id}>КРАЈ</a>

          </div>

        </Col>

      </Container>





    </>
  )
}

