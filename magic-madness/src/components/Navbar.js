import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/magic-madness' className='navbar-logo' onClick={closeMobileMenu}>
            MGC MDNS
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/magic-madness'
                className='nav-links'
                onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/magic-madness/decks'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Decks
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/magic-madness/random-effect'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Random Effect
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/magic-madness/mafia'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Mafia
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;