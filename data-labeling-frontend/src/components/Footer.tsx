
import React from 'react'
import { Container, Navbar, Col } from 'react-bootstrap';

export const Footer = () => {


    let fullYear = new Date().getFullYear();


    return (
        <Navbar fixed='bottom' bg="dark" variant='dark'>
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div>{fullYear}-{fullYear+1} Владимир Јокановић</div>
                </Col>
            </Container>
        </Navbar>
    )
}
