import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header Section */}
      <header className='text-white p-4 bg-primary'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold' aria-label='Occasionton Logo'>
            <Link to='/'>Occasionton</Link>
          </h1>
          <button className='md:hidden' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className='hidden md:flex'>
            <ul className='flex space-x-4'>
              {isHomePage && (
                <>
                  <li>
                    <Link to='/homepage' className='hover:underline'>
                      Features
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
          className={`${
            isMobileMenuOpen ? 'flex justify-center' : 'hidden'
          } md:hidden`}
        >
          <ul className='flex flex-col space-y-4'>
            {isHomePage && (
              <>
                <li>
                  <Link to='/homepage' className='hover:underline'>
                    Features
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

      {/* Hero Section */}
      <section className='bg-cover bg-center bg-header-bg-image h-screen flex items-center justify-center text-center'>
        <div className='bg-black bg-opacity-50 p-8 rounded'>
          <h2 className='text-4xl text-white font-bold'>
            Discover Events with Occasionton!
          </h2>
          <p className='text-lg text-white mt-2'>
            Connect, explore, and participate in events effortlessly.
          </p>
          <div className='mt-4'>
            <a
              href='#signup'
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Get Started
            </a>
            <a
              href='#learn-more'
              className='bg-transparent border border-white text-white px-4 py-2 rounded ml-2 hover:bg-white hover:text-black'
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-16 bg-primary'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8 text-white'>
            Why Choose Occasionton?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-white p-6 rounded shadow'>
              <h3 className='text-xl font-semibold'>Browse Events</h3>
              <p>
                Explore diverse events happening around you, all in one place.
              </p>
            </div>
            <div className='bg-white p-6 rounded shadow'>
              <h3 className='text-xl font-semibold'>Easy Sign-Up</h3>
              <p>
                Register for events quickly and effortlessly, with instant
                confirmations.
              </p>
            </div>
            <div className='bg-white p-6 rounded shadow'>
              <h3 className='text-xl font-semibold'>Calendar Integration</h3>
              <p>
                Sync events directly with your calendar to stay organized and on
                track.
              </p>
            </div>
            <div className='bg-white p-6 rounded shadow'>
              <h3 className='text-xl font-semibold'>Event Management Tools</h3>
              <p>
                Robust tools for staff to create, manage, and promote events
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='py-16 bg-secondary'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>How Occasionton Works</h2>
          <ol className='space-y-4'>
            <li className='font-semibold'>
              1. Sign Up: Create an account quickly and easily.
            </li>
            <li className='font-semibold'>
              2. Explore: Browse exciting events tailored to your interests.
            </li>
            <li className='font-semibold'>
              3. Join: Participate and receive timely reminders for events.
            </li>
            <li className='font-semibold'>
              4. Manage: Empower staff to create and manage events effortlessly.
            </li>
          </ol>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>
            What Users Say About Occasionton
          </h2>
          <div className='space-y-4'>
            <blockquote className='italic'>
              “Occasionton makes event planning and discovery a breeze!”
            </blockquote>
            <cite className='font-semibold'>- Jessica T.</cite>
            <blockquote className='italic'>
              “The management tools are a lifesaver. Highly recommended!”
            </blockquote>
            <cite className='font-semibold'>- Mike S.</cite>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className='py-16 bg-secondary text-black text-center'>
        <h2 className='text-3xl font-bold mb-4'>
          Start Your Occasionton Journey
        </h2>
        <a
          href='#signup'
          className='bg-green-500 px-6 py-3 rounded hover:bg-green-600'
        >
          Sign Up Now
        </a>
        <a
          href='#browse-events'
          className='bg-transparent border border-green-500 text-black px-4 py-2 rounded ml-2 hover:bg-green-500 hover:text-white'
        >
          Browse Events
        </a>
      </section>

      {/* Footer Section */}
      <footer id='contact' className='bg-primary text-white py-6'>
        <div className='container mx-auto text-center'>
          <p className='mb-4'>© 2024 Occasionton. All Rights Reserved.</p>
          <nav>
            <ul className='flex justify-center space-x-6'>
              <li>
                <a href='/privacy-policy' className='hover:underline'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='/terms-of-service' className='hover:underline'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='/faqs' className='hover:underline'>
                  FAQs
                </a>
              </li>
            </ul>
          </nav>
          <div className='mt-4'>
            <p>
              Contact us:{' '}
              <a href='mailto:support@occasionton.com' className='underline'>
                support@occasionton.com
              </a>
            </p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className='flex justify-center space-x-4 mt-4'>
            <a href='#' className='hover:underline'>
              Facebook
            </a>
            <a href='#' className='hover:underline'>
              Twitter
            </a>
            <a href='#' className='hover:underline'>
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
