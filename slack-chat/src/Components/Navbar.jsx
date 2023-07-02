import { Button, Container, Navbar as BootstrapNavBar } from 'react-bootstrap';

const Navbar = () => (
  <BootstrapNavBar className="shadow-sm bg-white">
    <Container>
      <BootstrapNavBar.Brand href="#">Hexlet Chat</BootstrapNavBar.Brand>
      <Button>Sign Out</Button>
    </Container>
  </BootstrapNavBar>
);

export default Navbar;
