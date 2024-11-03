// src/Verify.js
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { confirmVerification } from '../../appwrite/authentication';
import { Navigate, useNavigate } from 'react-router-dom';

const Verify = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', or 'error'
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('secret');
  const userId = urlParams.get('userId');

  useEffect(() => {
    confirmVerification(userId, secret)
      .then((response) => {
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
      })
      .catch((error) => {
        setStatus('error');
        setMessage('Verification failed. Please try again or contact support.');
      });
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-primary  p-4'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center'>
        {/* Loading State */}
        {status === 'loading' && (
          <div role='status' aria-live='polite'>
            <div className='flex justify-center mb-4 animate-spin'>
              <svg
                className='h-12 w-12 text-blue-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                ></path>
              </svg>
            </div>
            <p className='text-gray-700 text-lg font-medium'>{message}</p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div role='status' aria-live='polite'>
            <div className='flex justify-center mb-4'>
              <AiFillCheckCircle className='h-16 w-16 text-green-500 animate-bounce' />
            </div>
            <p className='text-green-600 text-lg font-semibold'>{message}</p>
            <button
              onClick={() => navigate('/signin')}
              className='mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300'
              aria-label='Go to Login'
            >
              Go to Login
            </button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div role='status' aria-live='polite'>
            <div className='flex justify-center mb-4'>
              <AiFillCloseCircle className='h-16 w-16 text-red-500 animate-shake' />
            </div>
            <p className='text-red-600 text-lg font-semibold'>{message}</p>
            <button
              onClick={() => navigate('/signup')}
              className='mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300'
              aria-label='Go to Registration'
            >
              Go to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
