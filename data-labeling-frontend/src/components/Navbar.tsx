import React from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <NavbarBrand href='/'>Лабелограф</NavbarBrand>
        </Container>

    </Navbar>
  )
}
