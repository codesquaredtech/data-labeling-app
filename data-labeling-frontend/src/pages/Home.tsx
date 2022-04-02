import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Button} from 'react-bootstrap'
import LabelingAxiosClient from '../services/clients/LabelingAxiosClient'

export const Home = () => {


  return (
    <Container style={{ textAlign: "center", marginTop:"75px"}}>
      <h1>Лабелисање података апликације</h1>
      <hr/>
      <p>
        Лабелирајте податке!
      </p>

        <br/>

          <a href='/user'>Лабелирајте! // КОРИСНИК</a>
          <a href='/admin'>Креирајте пројекте  // АДМИН</a>


    


    </Container>
  )
}
