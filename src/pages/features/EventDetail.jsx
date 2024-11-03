import React from 'react';
import Navbar from '../../components/landing/Navbar';

const EventDetail = () => {
  return (
    <div className='flex flex-col justify-between '>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-10'>
        <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg'>
          <h1 className='text-3xl font-bold text-primary mb-4'>Event Title</h1>
          <p className='text-gray-700 mb-6'>
            Detailed information about the event, including location, date,
            time, and other important details.
          </p>

          {/* Action Buttons */}
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              aria-label='Sign Up for Event Title'
            >
              Sign Up
            </button>
            <button
              className='bg-primary text-white py-2 px-6 mt-4 md:mt-0 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              aria-label='Add Event Title to Calendar'
            >
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
