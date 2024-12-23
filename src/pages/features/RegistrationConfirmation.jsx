import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import NotFoundPage from '../NotFound';
import { toast } from 'react-toastify';

const RegistrationConfirmation = () => {
  const location = useLocation();
  const event = location.state.event;
  const navigate = useNavigate();

  if (!event) return <NotFoundPage />;

  const addToGoogleCalender = (event) => {
    const [startHours, startMinutes] = event.startTime.split(':');

    const [endHours, endMinutes] = event.endTime.split(':');

    const eventDate = new Date(event.date);

    const startDateTime = new Date(
      Date.UTC(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        startHours,
        startMinutes
      )
    );
    const endDateTime = new Date(
      Date.UTC(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        endHours,
        endMinutes
      )
    );

    startDateTime.setHours(startHours, startMinutes);
    endDateTime.setHours(endHours, endMinutes);

    const startTime = startDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      event.description || 'Event Details'
    )}&location=${encodeURIComponent(event.location)}`;
    navigate('/profile');
    window.open(googleCalendarUrl, '_blank');
  };

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
        <div
          id='buttons-container'
          className='flex flex-col md:flex-row gap-4 justify-center mt-6'
        >
          <button
            className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark'
            aria-label={`Add ${event.title} to calendar`}
            onClick={() => addToGoogleCalender(event)}
          >
            Add to Calendar
          </button>
          <button
            className='bg-gray-200 text-gray-700 py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-300'
            aria-label='Go to Home Page'
            onClick={() => navigate('/homepage')}
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default RegistrationConfirmation;
