

import React,{useContext} from 'react'
import { ContextType, FormContext } from '../FormContext'
import { Form } from 'react-bootstrap'
import { Field } from '../Element'

const Input = (props:any) => {


  const {handleChange} = React.useContext(FormContext) as ContextType;

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>{props.field.name}</Form.Label>
    <input className="form-control"   type="text" 
      onChange={event => handleChange(props.field._id, event)}
    
    />

  </Form.Group>

  )
}

export default Input