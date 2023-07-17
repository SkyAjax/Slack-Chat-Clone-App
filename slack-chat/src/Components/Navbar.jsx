import { Button, Container, Navbar as BootstrapNavBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        {auth.loggedIn ? <Button onClick={() => handleLogOut()}>{t('buttons.signOut')}</Button> : null}
      </Container>
    </BootstrapNavBar>
  );
};

export default Navbar;
