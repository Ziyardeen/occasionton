import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='text-white p-4 bg-primary'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold' aria-label='Community Events Logo'>
          <Link to='/'>Occasionton</Link>
        </h1>
        <button className='md:hidden' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`hidden md:flex`}>
          <ul className='flex space-x-4'>
            {isHomePage && (
              <>
                <li>
                  <Link to='/homepage' className='hover:underline'>
                    Application
                  </Link>
                </li>
                <li>
                  <Link to='#how-it-works' className='hover:underline'>
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to='#contact' className='hover:underline'>
                    Contact Us
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to='/signin' className='hover:underline'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/signup' className='hover:underline'>
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav
        className={`${isMobileMenuOpen ? 'flex justify-center' : 'hidden'} md:hidden`}
      >
        <ul className='flex space-x-4'>
          {isHomePage && (
            <>
              <li>
                <Link to='/homepage' className='hover:underline'>
                  Application
                </Link>
              </li>
              <li>
                <Link to='#how-it-works' className='hover:underline'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to='#contact' className='hover:underline'>
                  Contact Us
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to='/signin' className='hover:underline'>
              Login
            </Link>
          </li>
          <li>
            <Link to='/signup' className='hover:underline'>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
