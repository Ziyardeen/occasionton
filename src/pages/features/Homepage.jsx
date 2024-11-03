import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import events from '../../Data/events.json';

const Homepage = () => {
  console.log(events);
  return (
    <div className='flex flex-col justify-between'>
      <Navbar />

      <div className='bg-secondary min-h-screen py-12 px-6 md:px-12 mt-10'>
        <div className='max-w-5xl mx-auto text-center'>
          <h1 className='text-5xl font-bold text-primary mb-8'>
            Discover Upcoming Events
          </h1>
          <p className='text-lg text-gray-700 mb-12'>
            Join us to explore, network, and participate in events that suit
            your interests!
          </p>

          {/* Highlighted Events */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {events
              .filter((event) => event.isFeatured)
              .map((event, index) => {
                if (event.isFeatured) {
                  return (
                    <div
                      key={index}
                      className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow'
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className='w-full h-48 object-cover rounded-md mb-4'
                      />
                      <h2 className='text-xl font-semibold text-primary mb-2'>
                        {event.title}
                      </h2>
                      <p className='text-gray-600 mb-4'>{event.description}</p>
                      <Link
                        to={`/events/${index + 1}`}
                        className='text-primary font-semibold underline'
                      >
                        Learn More
                      </Link>
                    </div>
                  );
                } else {
                  return;
                }
              })}
          </div>

          <div className='mt-10'>
            <Link
              to='/events'
              className='bg-primary text-white py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors'
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
