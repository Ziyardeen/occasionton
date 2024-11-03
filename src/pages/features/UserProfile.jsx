import React from 'react';
import Navbar from '../../components/landing/Navbar';

const UserProfile = () => {
  return (
    <div className='flex flex-col justify-between '>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10  mt-12'>
        <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg'>
          <h1 className='text-3xl font-bold text-primary mb-6'>Your Profile</h1>

          {/* Signed-Up Events */}
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-primary'>Your Events</h2>
            <p className='text-gray-700'>
              List of events you've signed up for...
            </p>
          </div>

          {/* User Preferences */}
          <div>
            <h2 className='text-2xl font-semibold text-primary'>Preferences</h2>
            <p className='text-gray-700'>
              Manage your notification preferences...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
