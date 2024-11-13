import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import events from '../../Data/events.json';
import NotFoundPage from '../NotFound';
import { addAttendee } from '../../appwrite/database';
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventRegistration = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('not_paid');
  const location = useLocation();

  const event = location.state.event || {};
  // Hardcoded user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  // Automatically mark payment as complete if the event is free
  useEffect(() => {
    if (event && event.price === 0) {
      setPaymentStatus('paid');
    }
  }, [event]);

  if (!event) return <NotFoundPage />;

  // Simulate a payment process
  const handlePayment = async () => {
    try {
      // Implement payment logic here (e.g., call a payment API)
      alert(`Processing payment of $${event.price} for ${user.name}`);
      setPaymentStatus('paid');
    } catch (error) {
      alert('Payment failed, please try again.');
    }
  };

  // Handle registration after payment
  const handleRegistration = async () => {
    if (paymentStatus === 'paid') {
      const attendee = await addAttendee(
        database_id,
        collection_id,
        event.$id,
        'Ziyardeen'
      );
      console.log('Registration confirmed:', attendee);
      navigate(`/events/${event.$id}/confirmation`, {
        state: { event: event },
      });
    } else {
      alert('Please complete the payment first');
    }
  };

  return (
    <main className='bg-secondary min-h-screen p-6 md:p-10 mt-10'>
      <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          Register for {event.title}
        </h1>
        <p className='text-gray-700 mb-6'>{event.description}</p>

        {/* User Info */}
        <div className='mb-6'>
          <p className='text-gray-600 mb-2'>
            <strong>Name:</strong> {user.name}
          </p>
          <p className='text-gray-600'>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {/* Event Details */}
        <p className='text-gray-600 mb-4'>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className='text-gray-600 mb-4'>
          <strong>Location:</strong> {event.location}
        </p>
        <p className='text-gray-600 mb-6'>
          <strong>Price:</strong>{' '}
          {event.price === 0 ? 'Free' : `$${event.price}`}
        </p>
        <div>
          {/* Payment Button */}
          {event.price > 0 && paymentStatus === 'not_paid' ? (
            <button
              onClick={handlePayment}
              className='mx-2 bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark mb-4'
            >
              Pay ${event.price}
            </button>
          ) : (
            <p className='text-green-600 font-semibold mb-4'>
              {event.price === 0
                ? 'This is a free event.'
                : 'Payment Successful!'}
            </p>
          )}

          {/* Confirm Registration Button */}
          <button
            onClick={handleRegistration}
            className={`mx-2 bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark ${paymentStatus === 'not_paid' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={paymentStatus === 'not_paid'}
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </main>
  );
};

export default EventRegistration;
