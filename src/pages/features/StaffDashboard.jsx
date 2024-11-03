import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import eventsData from '../../Data/events.json'; // Assuming you have an events.json file for sample data

const StaffDashboard = () => {
  const [events, setEvents] = useState(eventsData); // Initialize state with events data

  // State for new event form inputs
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    category: '',
    tags: '',
    host: '',
    price: '',
    maxAttendees: '',
    registrationUrl: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Function to handle creating a new event
  const handleCreateEvent = () => {
    if (
      newEvent.title &&
      newEvent.description &&
      newEvent.date &&
      newEvent.location
    ) {
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt; // Set updatedAt to now for new events
      const newEventData = {
        ...newEvent,
        tags: newEvent.tags.split(',').map((tag) => tag.trim()), // Convert tags string to an array
        price: parseFloat(newEvent.price),
        maxAttendees: parseInt(newEvent.maxAttendees, 10),
        createdAt,
        updatedAt,
        status: 'Active',
      };
      setEvents([...events, newEventData]); // Add new event to the list
      setNewEvent({
        // Reset the form
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        category: '',
        tags: '',
        host: '',
        price: '',
        maxAttendees: '',
        registrationUrl: '',
      });
    } else {
      alert(
        'Please fill in all required fields (title, description, date, location).'
      );
    }
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (title) => {
    const updatedEvents = events.filter((event) => event.title !== title);
    setEvents(updatedEvents); // Update the state with the new events list
  };

  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12'>
        <h1 className='text-3xl font-bold text-primary mb-8 text-center md:text-left'>
          Staff Dashboard
        </h1>

        <div className='space-y-4'>
          {/* Create New Event Section */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Create New Event
            </h2>
            <input
              type='text'
              name='title'
              placeholder='Event Title'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.title}
              onChange={handleChange}
              required
            />
            <textarea
              name='description'
              placeholder='Event Description'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.description}
              onChange={handleChange}
              required
            />
            <input
              type='datetime-local'
              name='date'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.date}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='location'
              placeholder='Location'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.location}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='image'
              placeholder='Image URL'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.image}
              onChange={handleChange}
            />
            <input
              type='text'
              name='category'
              placeholder='Category'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.category}
              onChange={handleChange}
            />
            <input
              type='text'
              name='tags'
              placeholder='Tags (comma separated)'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.tags}
              onChange={handleChange}
            />
            <input
              type='text'
              name='host'
              placeholder='Host'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.host}
              onChange={handleChange}
            />
            <input
              type='number'
              name='price'
              placeholder='Price'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.price}
              onChange={handleChange}
              step='0.01'
            />
            <input
              type='number'
              name='maxAttendees'
              placeholder='Max Attendees'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.maxAttendees}
              onChange={handleChange}
            />
            <input
              type='text'
              name='registrationUrl'
              placeholder='Registration URL'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.registrationUrl}
              onChange={handleChange}
            />
            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              onClick={handleCreateEvent}
              aria-label='Create New Event'
            >
              Create Event
            </button>
          </div>

          {/* Managed Events List */}
          <div className='space-y-4'>
            {events.map((event, index) => (
              <div
                key={index}
                className='p-4 bg-white shadow-md rounded-md flex flex-col md:flex-row justify-between items-center'
              >
                <div>
                  <h2 className='text-xl font-semibold text-primary'>
                    {event.title}
                  </h2>
                  <p className='text-gray-600'>{event.description}</p>
                </div>
                <div className='flex space-x-2 mt-4 md:mt-0'>
                  <button
                    className='text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    aria-label={`Edit ${event.title}`}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    onClick={() => handleDeleteEvent(event.title)} // Delete the event
                    aria-label={`Delete ${event.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
