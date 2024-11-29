import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import { listDocuments } from '../../appwrite/database';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventsList = () => {
  const startFocus = useRef();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [eventsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (startFocus.current) {
      startFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const eventsData = await listDocuments(database_id, collection_id);
        setEvents(eventsData.documents);
        setFilteredEvents(eventsData.documents);
        setLoading(false);
      } catch (error) {
        toast.error('Something went wrong fetchimng events!!');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const eventsData = await listDocuments(database_id, collection_id);
        const categories = Array.from(
          new Set(eventsData.documents.map((event) => event.category))
        );
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        toast.error('Something went wrong getting categories !!');
        console.log(error);
      }
    })();
  }, []);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Handle page navigation
  const handleNextPage = () => {
    if (indexOfLastEvent < filteredEvents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'All') {
      setFilteredEvents(events); // Reset to all events
    } else {
      const filtered = events.filter(
        (event) => event.category === selectedCategory
      );
      setFilteredEvents(filtered);
    }
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className='flex flex-col justify-between'>
      <Navbar />
      <div className='bg-secondary min-h-screen p-6 md:p-10 mt-12 flex flex-col justify-center items-center'>
        <h1
          className='text-3xl font-bold text-primary mb-8 text-center md:text-left'
          ref={startFocus}
          tabIndex='-1'
        >
          All Events
        </h1>

        {/* Filter Section */}
        <div className='mb-6'>
          <label htmlFor='filter' className='text-primary font-semibold'>
            Filter by:
          </label>
          <select
            id='filter'
            className='ml-2 p-2 rounded border border-gray-300 focus:border-primary focus:outline-none'
            aria-label='Filter events by category'
            onChange={handleCategoryChange}
          >
            <option value='All'>All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Event List */}
        {loading ? (
          <>Loading........</>
        ) : (
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {currentEvents.map((event, index) => (
              <div key={index} className='p-4 bg-white shadow-lg rounded-md'>
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className='w-full h-48 object-cover rounded-md'
                  />
                ) : (
                  <img
                    src='https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1732285408~exp=1732289008~hmac=f9ba003e38301123560c0252b61bf57c193922be153f5b6f918f474d30c84beb&w=826'
                    alt={event.title}
                    className='w-full h-48 object-cover rounded-md'
                  />
                )}

                <h2 className='text-2xl font-semibold text-primary mt-4'>
                  {event.title}
                </h2>
                <p className='text-gray-700 mt-2'>{event.description}</p>
                <button
                  className='mt-4 text-primary underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  aria-label={`View Details for ${event.title}`}
                  onClick={() =>
                    navigate(`/events/${event.$id}`, {
                      state: { event: event },
                    })
                  }
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className='flex justify-between items-center mt-8 '>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className='bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50'
          >
            Previous
          </button>
          <span className='text-gray-700 mx-5'>
            Page {currentPage} of{' '}
            {Math.ceil(filteredEvents.length / eventsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastEvent >= filteredEvents.length}
            className='bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
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

export default EventsList;
