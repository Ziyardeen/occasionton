import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { deleteAttendees, listDocuments } from '../../appwrite/database';
import { UserContext } from '../../App';
import { logoutUser } from '../../appwrite/authentication';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const user = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const eventsData = await listDocuments(database_id, collection_id);
        setUserEvents(eventsData.documents);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong getting events.');
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/home');
      setSuccess(true);
      setMessage('Logout Successfull !!');
      toast.success('Logout Successfull !!');
    } catch (error) {
      setMessage('Error Logging Out');
      toast.error('Error Logging Out');
      setSuccess(false);
    }
  };

  // Function to handle event cancellation
  const handleCancelEvent = async (event) => {
    try {
      await deleteAttendees(database_id, collection_id, event.$id, user.$id);
      setUserEvents((prevEvents) =>
        prevEvents.filter((e) => e.$id !== event.$id)
      );
      toast.error(`${event.title} has been cancelled successfully!.`);
    } catch (error) {
      toast.error('Error Cancelling Event');
    }
  };

  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12'>
        <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg'>
          <h1 className='text-3xl font-bold text-primary mb-6'>Your Profile</h1>

          {/* Signed-Up Events */}
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-primary'>Your Events</h2>

            {loading ? (
              <>Loading.....</>
            ) : userEvents.length > 0 ? (
              <ul className='space-y-4'>
                {userEvents
                  .filter((event) => event.attendees.includes(user.$id))
                  .map((event, index) => (
                    <li
                      key={index}
                      className='p-4 bg-gray-100 rounded-md shadow'
                    >
                      <h3 className='text-xl font-semibold text-primary'>
                        {event.title}
                      </h3>
                      <p className='text-gray-700'>{event.description}</p>
                      <p className='text-gray-600'>
                        <strong>Date:</strong>{' '}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className='text-gray-600'>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <button
                        className='mt-2 text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        onClick={() => handleCancelEvent(event)}
                        aria-label={`Cancel ${event.title}`}
                      >
                        Cancel Event
                      </button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className='text-gray-700'>
                You have not signed up for any events yet.
              </p>
            )}
          </div>

          {/* User Logout */}
          <div className='w-full flex justify-center'>
            <button
              className='bg-red-500 w-20 h-10 rounded-md '
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {!success && <ToastContainer />}
    </div>
  );
};

export default UserProfile;
