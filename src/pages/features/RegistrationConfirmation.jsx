import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import events from '../../Data/events.json';
import NotFoundPage from '../NotFound';

const RegistrationConfirmation = () => {
  const location = useLocation();
  const event = location.state.event;

  if (!event) return <NotFoundPage />;

  return (
    <main className='bg-secondary min-h-screen p-6 md:p-10 mt-10'>
      <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg text-center'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          You're Registered!
        </h1>
        <p className='text-gray-700 mb-6'>
          Thank you for registering for {event.title}.
        </p>
        <p className='text-gray-600 mb-4'>
          We look forward to seeing you on{' '}
          {new Date(event.date).toLocaleDateString()} at {event.location}.
        </p>
        <button
          className='bg-primary text-white py-2 px-6 mt-4 md:mt-0 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark'
          aria-label={`Add ${event.title} to calendar`}
          onClick={() => alert(`Added ${event.title} to calendar!`)}
        >
          Add to Calendar
        </button>
      </div>
    </main>
  );
};

export default RegistrationConfirmation;
