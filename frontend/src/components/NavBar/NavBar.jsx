import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
        {isAuthenticated && (
          <Button type="primary" onClick={handleLogout}>Выйти</Button>
        )}
      </Container>
    </Navbar>
  )
};

export default NavBar;
