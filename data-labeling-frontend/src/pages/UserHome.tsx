import React from 'react'
import { Container } from 'react-bootstrap'
import { UserProjectTable } from '../components/UserProjectTable'

const UserHome = () => {



  return (
    <Container>

      <div style={{ marginBottom: "25px" }}>
        <div style={{ textAlign: "center" }}>
          <h5>Улога: <i>ЛАБЕЛАР</i></h5>
        </div>
        <UserProjectTable />


      </div>

    </Container>

  )
}

export default UserHome