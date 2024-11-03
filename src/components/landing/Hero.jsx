import React from 'react';

const Hero = () => {
  return (
    <section className='bg-cover bg-center bg-header-bg-image h-screen flex items-center justify-center text-center'>
      <div className='bg-black bg-opacity-50 p-8 rounded'>
        <h2 className='text-4xl text-white font-bold'>
          Join Your Community Events!
        </h2>
        <p className='text-lg text-white mt-2'>
          Discover, sign up for, and share local events effortlessly.
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
  );
};

export default Hero;
