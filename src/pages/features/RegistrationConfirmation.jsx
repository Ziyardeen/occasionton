import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import events from '../../Data/events.json';
import NotFoundPage from '../NotFound';

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
        <button
          className='bg-primary text-white py-2 px-6 mt-4 md:mt-0 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark'
          aria-label={`Add ${event.title} to calendar`}
          onClick={() => addToGoogleCalender(event)}
        >
          Add to Calendar
        </button>
      </div>
    </main>
  );
};

export default RegistrationConfirmation;
