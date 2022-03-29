import React, { useEffect, useState } from 'react'
import { Form , Button, Container, Row, Col} from 'react-bootstrap';
import { Field } from '../components/DynamicForm/Element';
import { ProjectService } from '../services/ProjectService';
import Element from '../components/DynamicForm/Element';
import { FormContext } from '../components/DynamicForm/FormContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export interface IElement{
    fields: Field[];
    projectId: string;
    text: string;
    title: string;
    totalNumber:number;
    ordinalNumber: number;

}

export interface FieldType{
  _id: string;
  type:string;
  value:string | boolean;
}

export interface CurrentPage{
  page: number,
  total: number;
}



const LabelingData = () => {


 const[elements, setElements] = useState<IElement>({
     fields: [],
     projectId : "",
     text: "",
     title: "",
     totalNumber: 0,
     ordinalNumber: 1
 });

 useEffect(() => {
     fetchCurrentNumber();
     fetchData(currentPage.page)

 },[])

 const {id} = useParams();


 const[currentPage, setCurrentPage] = useState<CurrentPage>({
   total: 0,
   page: 0
 })


 const {fields, projectId} = elements??{};
 let navigate = useNavigate();



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
  axios.post(`http://localhost:3030/project/${id}/data-accept`, elements);

  if(currentPage.page < currentPage.total){
    fetchData(++currentPage.page);
  }else{
    Swal.fire(
      'Good job!',
      'Успешно сте лабелисали све податке!',
      'success'
    )
    navigate("/user")
  }
  
    
    //navigate(`/${id}/labeling-data/${brojStanice+1}`);

 }





 async function fetchData(nr: number) {
    try{
      const response = await ProjectService.getLabelingData(id, nr);
      setElements(response.data);
    }catch(e){
      console.error("Error while getting api")
    }
    
  }

  async function fetchCurrentNumber(){
    try{
      const response1 = await axios.get(`http://localhost:3030/project/${id}/current-page`);
      setCurrentPage(response1.data);
      fetchData(response1.data.page);

    }catch(e){
      console.error("Error while getting api")
    }
  }

  return (
    <FormContext.Provider value={{handleChange}}>
    <Container>

    <h3 style={{textAlign:"center", marginBottom:"25px"}}>{elements.title}</h3>
    <hr/>

    <Row style={{marginTop:"50px", marginBottom:"25px"}}>
    <Col>
      <div>
        <h4>Ресурс...</h4>
        {elements.text}
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