import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import events from '../../Data/events.json';
import NotFoundPage from '../NotFound';
import { getDocument } from '../../appwrite/database';
import { getCurrentUser, logoutUser } from '../../appwrite/authentication';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventDetail = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggeIn, setISLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  // const [event, setEvent] = useState({});
  // const user = null;
  const { event } = location.state || {};

  // Log parameters once when the component mounts
  useEffect(() => {}, [event_id]);

  if (!event) return <NotFoundPage />;

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='bg-secondary flex-grow p-6 md:p-10 mt-10'>
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
          {/* Message  */}
          {!isLoggeIn && (
            <p className='text-red-600 mb-4'>
              <strong>Please Log In To signUp For An event</strong>
            </p>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col md:flex-row md:space-x-4 mt-6'>
            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark'
              aria-label={`Sign up for ${event.title}`}
              onClick={() => {
                if (!user) {
                  setISLoggedIn(false);
                  return;
                }
                setISLoggedIn(true);
                navigate(`/events/${event_id}/register`, {
                  state: { event: event },
                });
              }}
            >
              Sign Up For Event
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
