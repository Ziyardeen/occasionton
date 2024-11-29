import React, { createContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';

import { deleteAttendees, listDocuments } from '../../appwrite/database';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, SetSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const events = await listDocuments(database_id, collection_id);
        setLoading(false);
        setEvents(events.documents);
        SetSuccess(true);
      } catch (error) {
        toast.error('There was an error fetching events, try again.');
      }
    })();
  }, []);
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
          {loading ? (
            <>Loading.......</>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {events
                .filter((event) => event.isFeatured)
                .map((event, index) => {
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
                      <button
                        // to={`/events/${event.$id}`}
                        onClick={() =>
                          navigate(`/events/${event.$id}`, {
                            state: { event: event },
                          })
                        }
                        className='text-primary font-semibold underline'
                      >
                        Learn More
                      </button>
                    </div>
                  );
                })}
              {!success && <ToastContainer />}
            </div>
          )}

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
