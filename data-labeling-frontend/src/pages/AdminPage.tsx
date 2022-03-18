import React from 'react'
import { Button } from 'react-bootstrap'
import { ProjectTable } from '../components/ProjectTable'

export const AdminPage = () => {
  return (
    <>      
       <ProjectTable/>
       <div style={{ textAlign: "center", marginTop:"50px"}}>
         <h5>Желите ли додати нови пројекат? </h5>
         <p></p>
         <Button>Додај!</Button>
       </div>
    </>
    
  )
}
