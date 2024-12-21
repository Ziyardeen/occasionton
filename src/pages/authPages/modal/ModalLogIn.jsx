import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../../appwrite/authentication';
import { UserContext } from '../../../App';

const ModalLogIn = ({ event }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const user = useContext(UserContext);
  useEffect(() => {
    async () => {
      if (Object.keys(user) > 0) {
        await logoutUser();
      }
    };
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      setEmail('');
      setPassword('');
      setUser(user);
      navigate('/events');
    } catch (error) {
      if (error.code === 400) {
        toast.error('Invalid Email or Password!');
      } else if (error.code === 401) {
        toast.error(
          'Unauthorized access! Please check your credentials or Sign Up.'
        );
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center  min-h-fit bg-gray-100  mt-10'>
      <div className='w-full max-w-lg sm:max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <h2 className='text-3xl font-semibold text-center text-primary'>
            Login to Occasionton
          </h2>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              required
              aria-required='true'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
              onChange={handleEmail}
              value={email}
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              required
              aria-required='true'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
              onChange={handlePassword}
              value={password}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          >
            Login
          </button>

          <p className='mt-4 text-center text-sm'>
            <a
              href='/forgot-password'
              className='text-blue-500 hover:underline'
            >
              Forgot Password?
            </a>
          </p>

          <p className='mt-2 text-center text-sm'>
            Don’t have an account?{' '}
            <a href='/signup' className='text-blue-500 hover:underline'>
              Sign up here
            </a>
          </p>
        </form>
      </div>

      {/* Toastify Display here */}
      <ToastContainer />
    </div>
  );
};

export default ModalLogIn;
