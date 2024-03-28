import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigator() {
  const linkStyle = {
    textDecoration: 'none',
    color:'white'
  };

  const searchInput={
    backgroundColor:'white',
    color:'black'
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><Link to='/' style={linkStyle}>Popular</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to='/latest' style={linkStyle}>Latest</Link></Nav.Link>
            <Nav.Link href="#action3"><Link to='/comedy' style={linkStyle}>Comedy</Link></Nav.Link>
            
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control type="search"placeholder="Search"className="me-2"aria-label="Search"style={searchInput}/>
            <Nav.Link href="#action4"><Link to='/search' style={linkStyle}><Button variant="info">Search</Button></Link></Nav.Link>
            
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
