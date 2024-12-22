import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';

import {
  createDocument,
  deleteDocument,
  listDocuments,
  updateDocument,
  uploadImage,
} from '../../appwrite/database';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const StaffDashboard = () => {
  const [events, setEvents] = useState([]);
  const [switchToImageFile, setSwitchToImageFile] = useState(false);
  const [imageData, setImageData] = useState({});

  const [Editing, setEditing] = useState(false);
  const updateFocus = useRef();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const events = await listDocuments();
        setEvents(events.documents);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong fetching events');
      }
    })();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = events.filter((event) => {
        return event.title.toLowerCase().includes(searchTerm);
      });
      setFilteredEvents(searchResults);
    } else {
      setFilteredEvents(events);
    }
  }, [events, searchTerm]);

  // State for new event form inputs
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    image: '',
    category: '',
    tags: [],
    host: '',
    price: 0,
    maxAttendees: 0,

    attendees: [],
    isFeatured: false,
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatedValue = value;

    if (name === 'isFeatured' && value === 'True') {
      formatedValue = true;
    } else if (name === 'isFeatured' && value === 'False') {
      formatedValue = false;
    }

    setNewEvent({
      ...newEvent,
      [name]: formatedValue,
    });
  };

  const handleFloatChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: parseFloat(value),
    });
  };
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: parseInt(value),
    });
  };

  const handleArrayChanges = (e) => {
    const { name, value } = e.target;
    const array = value.split(',');

    setNewEvent({ ...newEvent, [name]: array });
  };

  // Function to handle creating a new event
  const handleCreateEvent = async () => {
    try {
      if (switchToImageFile) {
        const result = await uploadImage(imageData);

        if (Editing) {
          const updatedDocument = await updateDocument(
            database_id,
            collection_id,
            newEvent.$id,
            {
              title: newEvent.title,
              description: newEvent.description,
              date: newEvent.date,
              startTime: newEvent.startTime,
              endTime: newEvent.endTime,
              location: newEvent.location,
              image: result,
              category: newEvent.category,
              tags: newEvent.tags,
              host: newEvent.host,
              price: newEvent.price,
              maxAttendees: newEvent.maxAttendees,
              attendees: newEvent.attendees,
              isFeatured: newEvent.isFeatured,
            }
          );
          //////////
          // setEvents((prevEvents) => [...prevEvents, updatedDocument]);
          setEvents((prevEvents) => {
            return [
              ...prevEvents.filter(
                (event) => event.$id !== updatedDocument.$id
              ),
              updatedDocument,
            ];
          });
          ////////////

          ////set Editing to False
          setEditing(false);
          setNewEvent({
            title: '',
            description: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            image: '',
            category: '',
            tags: [],
            host: '',
            price: 0,
            maxAttendees: 0,

            attendees: [],
            isFeatured: false,
          });
          updateFocus.current.focus();
          return;
        }
        const event = await createDocument({ ...newEvent, image: result });

        //////////////
        setEvents((prevEvents) => [...prevEvents, event]);

        //////////////

        setNewEvent({
          title: '',
          description: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
          image: '',
          category: '',
          tags: [],
          host: '',
          price: 0,
          maxAttendees: 0,

          attendees: [],
          isFeatured: false,
        });
      } else {
        if (Editing) {
          const updatedDocument = await updateDocument(
            database_id,
            collection_id,
            newEvent.$id,
            {
              title: newEvent.title,
              description: newEvent.description,
              date: newEvent.date,
              startTime: newEvent.startTime,
              endTime: newEvent.endTime,
              location: newEvent.location,
              image: newEvent.image,
              category: newEvent.category,
              tags: newEvent.tags,
              host: newEvent.host,
              price: newEvent.price,
              maxAttendees: newEvent.maxAttendees,
              attendees: newEvent.attendees,
              isFeatured: Boolean(newEvent.isFeatured),
            }
          );
          ////////////
          // setEvents((prevEvents) => [...prevEvents, updatedDocument]);
          setEvents((prevEvents) => {
            return [
              ...prevEvents.filter(
                (event) => event.$id !== updatedDocument.$id
              ),
              updatedDocument,
            ];
          });
          ///////////

          setEditing(false);
          setNewEvent({
            title: '',
            description: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            image: '',
            category: '',
            tags: [],
            host: '',
            price: 0,
            maxAttendees: 0,

            attendees: [],
            isFeatured: false,
          });
          updateFocus.current.focus();
          return;
        }
        const event = await createDocument(newEvent);
        /////////
        setEvents((prevEvents) => [...prevEvents, event]);
        ///////

        setNewEvent({
          title: '',
          description: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
          image: '',
          category: '',
          tags: [],
          host: '',
          price: 0,
          maxAttendees: 0,

          attendees: [],
          isFeatured: false,
        });
      }
    } catch (error) {
      toast.error('Something went wrong creating the event');
    }
  };

  const handleImageFileChange = async (e) => {
    const name = e.target.name;
    const value = e.target.files[0] || e.target.value;

    setImageData(value);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = async (event) => {
    try {
      const title = event.title;
      const updatedEvents = events.filter((event) => event.title !== title);
      setEvents(updatedEvents);
      await deleteDocument(database_id, collection_id, event.$id);
      toast.success('Event deleted successully!');
    } catch (error) {
      toast.error('Something went wrong Deleting event');
    }
  };

  const handleImageFileToggle = () => {
    setSwitchToImageFile(!switchToImageFile);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setEditing(true);

    window.scrollTo(0, 0);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
            <h2
              className='text-xl font-semibold text-primary mb-2'
              ref={updateFocus}
            >
              Create New Event
            </h2>
            <label htmlFor='title'>Event Title</label>
            <input
              type='text'
              name='title'
              placeholder='Event Title'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.title}
              onChange={handleChange}
              required
            />
            <label htmlFor='description'>Event Description</label>
            <textarea
              name='description'
              placeholder='Event Description'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.description}
              onChange={handleChange}
              required
            />
            <label htmlFor='date'>Date</label>
            <input
              type='datetime-local'
              name='date'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.date ? formatDateForInput(newEvent.date) : ''}
              onChange={handleChange}
              required
            />
            <label htmlFor='StartTime'>Start Time</label>
            <input
              type='time'
              name='startTime'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.startTime}
              placeholder='E.g 09:00'
              onChange={handleChange}
              required
            />
            <label htmlFor='endTime'>End Time</label>
            <input
              type='time'
              name='endTime'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.endTime}
              placeholder='E.g 17:00'
              onChange={handleChange}
              required
            />

            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              placeholder='Location'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.location}
              onChange={handleChange}
              required
            />
            <label htmlFor='image'>Image</label>
            <div className='border-y-4'>
              {!Editing && (
                <div id='toggleImageInput'>
                  <input
                    type='checkbox'
                    checked={switchToImageFile}
                    onChange={handleImageFileToggle}
                  />{' '}
                  <span>Use File Upload</span>
                </div>
              )}

              {switchToImageFile ? (
                <input
                  type='file'
                  name='image'
                  placeholder='Image URL'
                  className='border border-gray-300 rounded p-2 w-full mb-2'
                  value={newEvent.image}
                  onChange={handleImageFileChange}
                />
              ) : (
                <input
                  type='text'
                  name='image'
                  placeholder='Image URL'
                  className='border border-gray-300 rounded p-2 w-full mb-2'
                  value={newEvent.image}
                  onChange={handleChange}
                />
              )}
            </div>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              name='category'
              placeholder='Category'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.category}
              onChange={handleChange}
            />
            <label htmlFor='tags'>Tags</label>
            <input
              type='text'
              name='tags'
              placeholder='Tags (comma separated)'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={[newEvent.tags]}
              onChange={handleArrayChanges}
            />
            <label htmlFor='host'>Host</label>
            <input
              type='text'
              name='host'
              placeholder='Host'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.host}
              onChange={handleChange}
            />
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              placeholder='Price'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.price || 0}
              onChange={handleFloatChange}
              min={0}
            />
            <label htmlFor='maxAttendees'>Max Attendees</label>
            <input
              type='number'
              name='maxAttendees'
              placeholder='Max Attendees'
              className='border border-gray-300 rounded p-2 w-full mb-2'
              value={newEvent.maxAttendees || 0}
              onChange={handleNumberChange}
              min={0}
            />

            <div>
              <label htmlFor='isFeatured'>Set Featured Status</label>
              <select
                className='border border-gray-300 rounded p-2 w-full my-2'
                name='isFeatured'
                value={newEvent.isFeatured}
                onChange={handleChange}
              >
                <option value='False'>False</option>
                <option value='True'>True</option>
              </select>
            </div>

            <button
              className='bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              onClick={handleCreateEvent}
              aria-label='Create New Event'
            >
              {Editing ? 'Updated Event' : 'Create Event'}
            </button>
          </div>

          <div className='bg-green-200 w-1/5'>
            {/* <label htmlFor='search'>Search</label> */}
            <input
              className='b-0 w-full'
              name='search'
              type='text'
              placeholder=' Search......'
              onChange={handleSearch}
            />
          </div>

          {/* Managed Events List */}
          {loading ? (
            <>Laoding.......</>
          ) : (
            <div className='space-y-4'>
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className='p-4 bg-white shadow-md rounded-md flex flex-row md:flex-row justify-between items-center max-h-1/4'
                >
                  <div className='w-1/4 mx-2'>
                    <img
                      src={
                        event.image ||
                        'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1732285408~exp=1732289008~hmac=f9ba003e38301123560c0252b61bf57c193922be153f5b6f918f474d30c84beb&w=826'
                      }
                      alt=''
                      className=''
                    />
                  </div>
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
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className='text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      onClick={() => handleDeleteEvent(event)}
                      aria-label={`Delete ${event.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  );
};

export default StaffDashboard;
