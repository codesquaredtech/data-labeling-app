import React from 'react'
import Checkbox from './element/Checkbox';
import Input from './element/Input';

export interface Field{
    type: string;
    name: string;
    value:string | boolean;
    _id: string;
}

export interface Key{
  key:number;
}

const Element = (props:any) => {

  switch (props.field.type) {
    case "text":
      return <Input field={props.field}/>
    case "checkbox":
      return <Checkbox field={props.field}/>
    default:
      return <>Undefined field</>;
  }


}

export default Element