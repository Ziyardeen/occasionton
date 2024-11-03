import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';

const Homepage = () => {
  return (
    <div className='flex flex-col justify-between '>
      <Navbar />

      <div className='bg-secondary min-h-screen py-12 px-6 md:px-12 mt-10'>
        <div className='max-w-5xl mx-auto text-center'>
          <h1 className='text-5xl font-bold text-primary mb-8'>
            Discover Upcoming Events
          </h1>
          <p className='text-lg text-gray-700 mb-12'>
            Join us to explore, network, and participate in events that suit
            your interests!
          </p>

          {/* Highlighted Events */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Event 1 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 1
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/1'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
            {/* Event 2 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 2
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/2'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
            {/* Event 3 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 3
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/3'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
            {/* Event 4 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 4
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/4'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
            {/* Event 5 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 5
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/5'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
            {/* Event 6 */}
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'>
              <h2 className='text-xl font-semibold text-primary mb-2'>
                Event Title 6
              </h2>
              <p className='text-gray-600 mb-4'>
                A brief description of the event that captures the essence and
                highlights the purpose.
              </p>
              <Link
                to='/events/6'
                className='text-primary font-semibold underline'
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className='mt-10'>
            <Link
              to='/events'
              className='bg-primary text-white py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors'
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
