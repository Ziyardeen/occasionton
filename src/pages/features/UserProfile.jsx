import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import eventsData from '../../Data/events.json'; // Assuming you have an events.json file with event data

const UserProfile = () => {
  // Sample data for user's signed-up events
  const [userEvents, setUserEvents] = useState([
    eventsData[0], // Example event 1
    eventsData[1], // Example event 2
  ]);

  // State for user preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  // Function to handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked,
    });
  };

  // Function to handle event cancellation
  const handleCancelEvent = (eventTitle) => {
    const updatedEvents = userEvents.filter(
      (event) => event.title !== eventTitle
    );
    setUserEvents(updatedEvents);
    alert(`${eventTitle} has been cancelled.`);
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
            {userEvents.length > 0 ? (
              <ul className='space-y-4'>
                {userEvents.map((event, index) => (
                  <li key={index} className='p-4 bg-gray-100 rounded-md shadow'>
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
                      onClick={() => handleCancelEvent(event.title)}
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

          {/* User Preferences */}
          <div>
            <h2 className='text-2xl font-semibold text-primary'>Preferences</h2>
            <div className='mt-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='emailNotifications'
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  className='mr-2'
                />
                Email Notifications
              </label>
              <label className='flex items-center mt-2'>
                <input
                  type='checkbox'
                  name='smsNotifications'
                  checked={preferences.smsNotifications}
                  onChange={handlePreferenceChange}
                  className='mr-2'
                />
                SMS Notifications
              </label>
            </div>
            <div className='mt-4'>
              <button
                className='bg-primary text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                onClick={() => alert('Preferences saved!')}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
