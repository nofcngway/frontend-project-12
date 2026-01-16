import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

const NavBar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
        <Button type="primary">Выйти</Button>
      </Container>
    </Navbar>
  )
};

export default NavBar;
