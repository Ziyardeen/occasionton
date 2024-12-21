import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import NotFoundPage from '../NotFound';
import ReactModal from 'react-modal';
import LogIn from '../authPages/LogIn';
import { getDocument } from '../../appwrite/database';
import { getCurrentUser, logoutUser } from '../../appwrite/authentication';
import ModalLogIn from '../authPages/modal/ModalLogIn';
import { UserContext } from '../../App';

ReactModal.setAppElement('#root');
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventDetail = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { user } = useContext(UserContext);

  const [modalShow, setModalShow] = useState(false);
  const { event } = location.state || {};

  const handleSignUp = () => {
    console.log(user, '<<<<');
    if (!user || Object.keys(user).length === 0) {
      setModalShow(true); // Show modal if user is not logged in
      return;
    }
    navigate(`/events/register`, { state: { event } });
  };

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
            <strong>Duration:</strong> {`${event.startTime} - ${event.endTime}`}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Location:</strong> {event.location}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Price:</strong> £{event.price}
          </p>
          <p className='text-gray-600 mb-4'>
            <strong>Host:</strong> {event.host}
          </p>

          {!isLoggedIn && (
            <p className='text-red-600 mb-4'>
              <strong>Please Log In To signUp For An event</strong>
            </p>
          )}

          <div className='flex flex-col md:flex-row md:space-x-4 mt-6'>
            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark'
              aria-label={`Sign up for ${event.title}`}
              onClick={handleSignUp}
            >
              Sign Up For Event
            </button>
          </div>
        </div>
      </main>

      {!user ||
        (Object.keys(user).length === 0 && modalShow && (
          <ReactModal
            isOpen={modalShow}
            onRequestClose={() => setModalShow(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              },
              content: {
                inset: 'auto',
                width: '90%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '20px',
                borderRadius: '10px',
                background: '#fff',
                zIndex: 1100,
              },
            }}
          >
            <ModalLogIn event={event} />
          </ReactModal>
        ))}
    </div>
  );
};

export default EventDetail;
