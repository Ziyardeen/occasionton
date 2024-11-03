import React from 'react';
import Navbar from '../../components/landing/Navbar';

const StaffDashboard = () => {
  return (
    <div className='flex flex-col justify-between '>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12'>
        <h1 className='text-3xl font-bold text-primary mb-8 text-center md:text-left'>
          Staff Dashboard
        </h1>

        <div className='space-y-4'>
          <button
            className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            aria-label='Create New Event'
          >
            Create New Event
          </button>

          {/* Managed Event Example */}
          <div className='p-4 bg-white shadow-md rounded-md flex flex-col md:flex-row justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold text-primary'>
                Event Title
              </h2>
            </div>
            <div className='flex space-x-2 mt-4 md:mt-0'>
              <button
                className='text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                aria-label='Edit Event Title'
              >
                Edit
              </button>
              <button
                className='text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                aria-label='Delete Event Title'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
