import React from 'react'
import { Form } from 'react-bootstrap'

import { ContextType, FormContext } from '../FormContext'

const Checkbox = (props:any) => {

    const {handleChange} = React.useContext(FormContext) as ContextType;

    return (
        <>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>{props.field.name}</Form.Label>

        <Form.Check         onChange={event => handleChange(props.field._id,event)}
 type="checkbox" label="Чекирај ме!" />
        </Form.Group>

        </>
      )  
}

export default Checkbox