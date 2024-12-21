import React, { useContext, useEffect, useState } from 'react';
import loginImage from '../../assets/login-image.jpg';
import Header from '../../components/Header';
import { getCurrentUser, loginUser } from '../../appwrite/authentication';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        if (Object.keys(user).length > 0) {
          navigate('/homepage');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
    <div className='h-screen flex flex-col justify-between  bg-primary'>
      <Header />
      <div className='flex flex-col md:flex-row h-screen '>
        {/* Left Side - Image */}
        <div className='hidden md:flex md:w-1/2 mt-5'>
          <img
            src={loginImage}
            alt='Event Background'
            className='w-full h-full object-cover'
          />
        </div>
        {/* Right Side - Login Form */}
        <div className='flex items-center justify-center md:w-1/2 bg-white p-8 md:mb-10 h-full'>
          <form className='w-full max-w-sm' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-6 text-center'>
              Login to Occasionton
            </h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                required
                aria-required='true'
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
                onChange={handleEmail}
                value={email}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-sm font-medium mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                required
                aria-required='true'
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
                onChange={handlePassword}
                value={password}
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200'
            >
              Login
            </button>
            <p className='mt-4 text-center'>
              <a
                href='/forgot-password'
                className='text-blue-500 hover:underline'
              >
                Forgot Password?
              </a>
            </p>
            <p className='mt-2 text-center'>
              Don’t have an account?
              <a href='/signup' className='text-blue-500 hover:underline'>
                {' '}
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* Toastify Display here */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    </div>
  );
};

export default LogIn;
