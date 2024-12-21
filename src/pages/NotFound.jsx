import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4'>
      {/* Animated Container */}
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-indigo-600 animate-pulse'>
          404
        </h1>
        <h2 className='mt-4 text-3xl md:text-5xl font-semibold animate-fadeIn'>
          Page Not Found
        </h2>
        <p className='mt-2 text-gray-600 text-lg md:text-xl max-w-md mx-auto animate-fadeIn delay-150'>
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Animated Illustration */}
        <div className='mt-10 animate-bounce'>
          <svg
            className='w-32 h-32 mx-auto text-indigo-300'
            fill='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='img'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 2a10 10 0 100 20 10 10 0 000-20zM10 15h4v2h-4v-2zm0-8h4v6h-4V7z'
            />
          </svg>
        </div>

        {/* Accessible Button to Redirect Home */}
        <div className='mt-8 animate-fadeIn delay-300'>
          <Link
            to='/'
            className='px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-200'
            aria-label='Go back to the home page'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
