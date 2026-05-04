import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useAuth } from '../../AuthContext';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const { user, profile } = useAuth();
  const accountLabel = user
    ? profile?.nickname || profile?.username || 'Account'
    : 'Log In';

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMobileMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MGC MDNS
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/decks'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Decks
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/random-effect'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Random Effect
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={user ? '/account' : '/login'}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {accountLabel}
              </Link>
            </li>
            {user && (
              <li className='nav-item'>
                <button
                  className='nav-links logout-btn'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;