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


      <p>Или се региструј и постани Л А Б Е Л О Г Р А Ф</p>
      <Button variant="info">
          Региструј ме!
        </Button>
        <Button style={{marginLeft:"10px"}} variant="info">
          Улогујте се!
        </Button>

        <br/>
        <a href='/admin'>Admin</a>


    </Container>
  )
}
