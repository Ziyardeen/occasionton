import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/landing/Navbar';

import { listDocuments } from '../../appwrite/database';
import { useNavigate } from 'react-router-dom';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventsList = () => {
  const startFocus = useRef();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (startFocus.current) {
      startFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const events = await listDocuments(database_id, collection_id);
        setEvents(events.documents);
        console.log(events, 'EVENTS');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12'>
        <h1
          className='text-3xl font-bold text-primary mb-8 text-center md:text-left'
          ref={startFocus}
          tabIndex='-1'
        >
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
                onClick={() =>
                  navigate(`/events/${event.$id}`, { state: { event: event } })
                }
                // onClick={() => (window.location.href = `/events/${index + 1}`)} // Redirecting to event detail page
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
