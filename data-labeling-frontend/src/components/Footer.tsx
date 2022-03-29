import React from "react"
import { Container, Navbar, Col } from 'react-bootstrap';

export const Footer = () =>

<footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
    <Navbar fixed='bottom' bg="dark" variant='dark'>
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div> Владимир Јокановић</div>
                </Col>
            </Container>
        </Navbar>
    </div>


</footer>

export default Footer