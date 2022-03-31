import React from 'react'
import { Button, Container, Navbar, NavbarBrand } from 'react-bootstrap'
import { getAuth, signOut } from "firebase/auth";



export const NavBar = (props: any) => {


  return (
    <Navbar style={{marginBottom:"50px"}} bg="dark" variant="dark">
        <Container>
            <NavbarBrand href='/'>Лабелограф</NavbarBrand>
            <Button onClick={props.signOut}>Sign out</Button>
        </Container>

    </Navbar>
  )
}
