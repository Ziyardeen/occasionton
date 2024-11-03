import React, { useState } from 'react';
import { FaBars, FaCross, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='bg-primary text-white py-4 px-8 shadow-lg w-full z-50 fixed '>
      <div className='flex justify-between items-center max-w-5xl mx-auto'>
        <Link to='/' className='text-2xl font-bold'>
          Occasionton
        </Link>

        {/* Desktop View */}
        <div className='hidden md:flex md:justify-between md:align-bottom w-1/2 '>
          <Link
            to='/homepage'
            className={`hover:underline ${location.pathname === '/homepage' ? 'underline' : ''}`}
          >
            Home
          </Link>
          <Link
            to='/events'
            className={`hover:underline ${location.pathname === '/events' ? 'underline' : ''}`}
          >
            Events
          </Link>
          <Link
            to='/profile'
            className={`hover:underline ${location.pathname === '/profile' ? 'underline' : ''}`}
          >
            Profile
          </Link>
          <Link
            to='/staff-dashboard'
            className={`hover:underline ${location.pathname === '/staff-dashboard' ? 'underline' : ''}`}
          >
            Staff Dashboard
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMobileMenu}
          className='text-white md:hidden'
          aria-label='Toggle navigation'
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile View */}
      <div
        className={`${isMobileMenuOpen ? 'flex flex-col justify-center items-center  w-full md:hidden' : 'hidden'}`}
      >
        <Link
          to='/homepage'
          className={`hover:underline ${location.pathname === '/homepage' ? 'underline' : ''}`}
        >
          Home
        </Link>
        <Link
          to='/events'
          className={`hover:underline ${location.pathname === '/events' ? 'underline' : ''}`}
        >
          Events
        </Link>
        <Link
          to='/profile'
          className={`hover:underline ${location.pathname === '/profile' ? 'underline' : ''}`}
        >
          Profile
        </Link>
        <Link
          to='/staff-dashboard'
          className={`hover:underline ${location.pathname === '/staff-dashboard' ? 'underline' : ''}`}
        >
          Staff Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;