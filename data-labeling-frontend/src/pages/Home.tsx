import React from 'react'
import { Container, Button} from 'react-bootstrap'

export const Home = () => {
  return (
    <Container style={{ textAlign: "center", marginTop:"75px"}}>
      <h1>Лабелисање података апликације</h1>
      <hr/>
      <p>
        Лабелирајте податке!
      </p>

        <br/>
        <a href='/admin'>Admin</a>
        <br/>
        <a href='/user'>User</a>



    </Container>
  )
}
