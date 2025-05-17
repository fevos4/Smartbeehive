import Logo from '../Assets/logos.png';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import '../Styles/Components/NavbarBlack.scss';
import { AuthContext } from '../Context/AuthContext';
import Notification from './Notification';

function NavbarBlack() {
  const [openLinks, setOpenLinks] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleLogout = async () => {
    try {
      await logout();          // Makes API call to blacklist token
      navigate('/signin');     // Redirect after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      setNotificationMessage('Failed to log out. Please try again.');
    }
  };

  const closeNotification = () => {
    setNotificationMessage('');
  };

  return (
    <div className='navb'>
      <div className="navb-logo">
        <Link to="/"><img src={Logo} alt='Logo' /></Link>
      </div>

      <div className="menub-icon" onClick={toggleNavbar}>
        <MenuIcon />
      </div>

      <ul className={`navb-menu ${openLinks ? 'active' : ''}`}>
        <li className='navb-notification'>
          <Notification message={notificationMessage} onClose={closeNotification} />
        </li>
        <li className='navb-signout'>
          <button onClick={handleLogout} className="signout-button">
            SIGN OUT
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavbarBlack;
