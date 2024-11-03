import React from 'react';
import Navbar from '../../components/landing/Navbar';
import events from '../../Data/events.json';

const EventsList = () => {
  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12'>
        <h1 className='text-3xl font-bold text-primary mb-8 text-center md:text-left'>
          All Events
        </h1>

        {/* Filter Section */}
        <div className='mb-6'>
          <label htmlFor='filter' className='text-primary font-semibold'>
            Filter by:
          </label>
          <select
            id='filter'
            className='ml-2 p-2 rounded border border-gray-300 focus:border-primary focus:outline-none'
            aria-label='Filter events by category'
          >
            <option>All Categories</option>
            <option>Food & Drink</option>
            <option>Music</option>
            <option>Art</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Event List */}
        <div className='space-y-6'>
          {events.map((event, index) => (
            <div key={index} className='p-4 bg-white shadow-lg rounded-md'>
              <h2 className='text-2xl font-semibold text-primary'>
                {event.title}
              </h2>
              <p className='text-gray-700 mt-2'>{event.description}</p>
              <button
                className='mt-4 text-primary underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                aria-label={`View Details for ${event.title}`}
                onClick={() => (window.location.href = `/events/${index + 1}`)} // Redirecting to event detail page
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
