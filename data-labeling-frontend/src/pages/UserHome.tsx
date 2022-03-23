import React from 'react'
import { Container } from 'react-bootstrap'
import { UserProjectTable } from '../components/UserProjectTable'

const UserHome = () => {



  return (
    <Container style={{marginTop:"25px"}} >

        <div style={{textAlign:"center", marginBottom:"25px"}}>
            <h4>Здраво, Марко</h4>
            <h5>Улога: <i>ЛАБЕЛАР</i></h5>
            <hr/>
            <UserProjectTable/>
        </div>

    </Container>

  )
}

export default UserHome