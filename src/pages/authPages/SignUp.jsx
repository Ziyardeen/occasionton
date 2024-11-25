import React, { useState } from 'react';
import signupImage from '../../assets/signup-image.jpg';
import Header from '../../components/landing/Header';
import {
  loginUser,
  logoutUser,
  registerUser,
  sendVerificationEmail,
} from '../../appwrite/authentication';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://www.vecteezy.com/vector-art/40674548-signup-vector-icon

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      if (password !== passwordConfirmation) {
        setMessage('Passwords Do Not Match!');
        toast.error(message);

        return;
      }

      if (!passwordRegex.test(password)) {
        setMessage(
          'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.'
        );
        toast.error(
          'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.'
        );
        console.log('Password validation failed.');
        return;
      }

      const register = await registerUser(email, password, name);
      const userLogin = await loginUser(email, password);
      const callbackUrl = 'http://localhost:5173/verify';
      await sendVerificationEmail(callbackUrl);
      await logoutUser();

      console.log(register);

      setEmail('');
      setName('');
      setPassword('');
      setPasswordConfirmation('');
      setMessage('Registration successful!');
      setSuccess(true);
      toast.success('Registration successful!');
    } catch (error) {
      if (
        error.message ===
        'Registration Error: A user with the same id, email, or phone already exists in this project.'
      ) {
        setMessage('You already have an account, please go ahead and login.');
      } else {
        setMessage('Registration failed. Please try again.');
      }

      toast.error(message);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-between pb-6'>
      <Header />
      <div className='flex flex-col md:flex-row '>
        {/* Left Side - Image */}
        <div className='hidden  md:flex md:w-1/2 md:justify-center md:items-center md:border-r-4 md:border-primary'>
          <img
            src={signupImage}
            alt='Event Background'
            className='w-4/5  object-cover'
          />
        </div>
        {/* Right Side - Signup Form */}
        <div className='flex items-center justify-center md:w-1/2 bg-white p-8'>
          <form className='w-full max-w-sm' onSubmit={handleSignUpSubmit}>
            <h2 className='text-2xl font-bold mb-6 text-center'>
              Create Your Account
            </h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2' htmlFor='name'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                required
                aria-required='true'
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                placeholder='Enter your full name'
                value={name}
                onChange={handleName}
              />
            </div>
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
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className='mb-4'>
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
                value={password}
                onChange={handlePassword}
              />
              <p
                id='password-requirements'
                className='mt-1 text-xs text-gray-500'
              >
                Password must be at least 8 characters, include uppercase and
                lowercase letters, a number, and a special character.
              </p>
            </div>
            <div className='mb-6'>
              <label
                className='block text-sm font-medium mb-2'
                htmlFor='confirm-password'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirm-password'
                required
                aria-required='true'
                className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                placeholder='Confirm your password'
                value={passwordConfirmation}
                onChange={handlePasswordConfirmation}
              />
            </div>
            {/* Verification message is rendered here */}
            {success && (
              <div className='my-4 p-4 border border-green-500 bg-green-100 text-green-700 rounded-md shadow-md'>
                <h3 className='font-semibold text-lg'>
                  Verification Email Sent!
                </h3>
                <p>
                  Thanks for signing up! We’ve sent a verification email to your
                  inbox. Please check your email and follow the link to verify
                  your account.
                </p>
              </div>
            )}
            <button
              type='submit'
              className='w-full bg-primary text-white p-3 rounded hover:bg-primary transition duration-200'
            >
              Create Account
            </button>
            <p className='mt-4 text-center'>
              Already have an account?
              <a href='/signin' className='text-primary hover:underline'>
                {' '}
                Log in here
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* Toastify Display here */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
