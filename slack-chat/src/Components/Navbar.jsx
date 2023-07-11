import { Button, Container, Navbar as BootstrapNavBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <BootstrapNavBar className="shadow-sm bg-white">
      <Container>
        <BootstrapNavBar.Brand>
          <Link to="/" className="nav-link">
            Hexlet Chat
          </Link>
        </BootstrapNavBar.Brand>
        {auth.loggedIn ? <Button onClick={() => handleLogOut()}>Sign Out</Button> : null}
      </Container>
    </BootstrapNavBar>
  );
};

export default Navbar;
