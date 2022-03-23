import React, { useEffect, useState } from 'react'
import { Form , Button, Container, Row, Col} from 'react-bootstrap';
import { Field } from '../components/DynamicForm/Element';
import { ProjectService } from '../services/ProjectService';
import Element from '../components/DynamicForm/Element';
import { FormContext } from '../components/DynamicForm/FormContext';

export interface IElement{
    fields: Field[];
    projectId: string;
    projectResource: string;
    projectTitle: string;
}

export interface FieldType{
  _id: string;
  type:string;
  value:string | boolean;
}



const LabelingData = () => {


 const[elements, setElements] = useState<IElement>({
     fields: [],
     projectId : "",
     projectTitle: "",
     projectResource: ""
 });

 useEffect(() => {
     fetchProjects();
 },[])

 const {fields, projectId} = elements??{};


 const handleChange = (id:any, e: React.ChangeEvent<HTMLInputElement>) => {
   const newElements = {...elements}
   newElements.fields.forEach(field => {
     const {type:FieldType} = field;
     if(id === field._id){
      switch(field.type){
        case 'checkbox':
          field['value'] = e.target.checked;
          break
        default:
            if(field.value = 'checkbox'){
              field['value'] = false;
            }
            field['value'] = e.target.value;


      }

     }
     setElements(newElements);

     
   });

  // console.log(elements);

 }

 const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
   e.preventDefault();
  console.log(elements.fields);
 }



 async function fetchProjects() {
    try{
      const response = await ProjectService.getLabelingData("81c1si");
      setElements(response.data);
    }catch(e){
      console.error("Error while getting api")
    }
    
  }

  return (
    <FormContext.Provider value={{handleChange}}>
    <Container>

    <h3 style={{textAlign:"center", marginBottom:"25px"}}>{elements.projectTitle}</h3>
    <hr/>

    <Row style={{marginTop:"50px", marginBottom:"25px"}}>
    <Col>
      <div>
        <h4>Ресурс...</h4>
        {elements.projectResource}
      </div>
    
    </Col>
    <Col>
    
    
      <Form>
          {fields? fields.map((field, i)=> <Element key={i} field={field}/>):null}



          <Button style={{textAlign:"center"}} onClick={(e)=>handleSubmit(e)} variant="primary" type="submit">
            Пошаљи
          </Button>
      </Form>
    
    
    </Col>
  </Row>



  </Container>

  </FormContext.Provider>
  )
}

export default LabelingData