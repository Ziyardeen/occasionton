import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import events from '../../Data/events.json';
import NotFoundPage from '../NotFound';

const EventDetail = () => {
  const { eventId } = useParams();
  const event = events[eventId - 1];
  URL;
  console.log(console.log(useParams()));

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-10'>
        <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg'>
          <h1 className='text-3xl font-bold text-primary mb-4'>
            {event.title}
          </h1>
          <p className='text-gray-700 mb-6'>{event.description}</p>
          <p className='text-gray-600 mb-4'>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Location:</strong> {event.location}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Price:</strong> ${event.price}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Host:</strong> {event.host}
          </p>

          {/* Action Buttons */}
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              aria-label={`Sign Up for ${event.title}`}
              onClick={() => (window.location.href = event.registrationUrl)} // Redirect to registration URL
            >
              Sign Up
            </button>
            <button
              className='bg-primary text-white py-2 px-6 mt-4 md:mt-0 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              aria-label={`Add ${event.title} to Calendar`}
              onClick={() => {
                // Implement calendar functionality here
                alert(`Added ${event.title} to calendar!`);
              }}
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
