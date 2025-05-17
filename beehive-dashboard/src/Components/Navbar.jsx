import Logo from '../Assets/logos.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import '../Styles/Components/Navbar.scss';
import GoogleTranslateButton from "./GoogleTranslateButton"

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className='nav'>
      <div className="nav-logo">
        <Link to="/"><img src={Logo} alt='Logo' /></Link>
      </div>
      <div className="translate" >
        <GoogleTranslateButton />
      </div>
      <div className="menu-icon" onClick={toggleNavbar}>
        <MenuIcon />
      </div>
      <ul className={`nav-menu  ${openLinks && 'active'}`}>
        <li className='nav-signin'><Link to="/signin">SIGN IN</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
