import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFound';
import { addAttendee } from '../../appwrite/database';
import { UserContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;

const EventRegistration = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('not_paid');
  const location = useLocation();
  const { user } = useContext(UserContext);

  const event = location.state?.event || {};

  useEffect(() => {
    if (event && event.price === 0) {
      setPaymentStatus('paid');
    }
  }, [event]);

  if (!event) return <NotFoundPage />;

  const handlePayment = async () => {
    try {
      setPaymentStatus('paid');
      toast.success('Payment successful!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleRegistration = async () => {
    if (paymentStatus === 'paid') {
      try {
        const attendee = await addAttendee(
          database_id,
          collection_id,
          event.$id,
          user.$id
        );
        toast.success('Registration confirmed!');
        navigate(`/events/confirmation`, {
          state: { event: event },
        });
      } catch (error) {
        toast.error('Registration failed. Please try again.');
      }
    } else {
      toast.warn('Please complete the payment first.');
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
          <strong>Duration: </strong>
          {`${event.startTime} - ${event.endTime}`}
        </p>
        <p className='text-gray-600 mb-4'>
          <strong>Location:</strong> {event.location}
        </p>
        <p className='text-gray-600 mb-6'>
          <strong>Price:</strong>{' '}
          {event.price === 0 ? 'Free' : `£${event.price}`}
        </p>

        <div>
          {/* Payment Button */}
          {event.price > 0 && paymentStatus === 'not_paid' ? (
            <button
              onClick={handlePayment}
              className='mx-2 bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark mb-4'
            >
              Pay £{event.price}
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
            className={`mx-2 bg-primary text-white py-2 px-6 rounded w-full md:w-auto text-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-dark ${
              paymentStatus === 'not_paid'
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={paymentStatus === 'not_paid'}
          >
            Confirm Registration
          </button>
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
    </main>
  );
};

export default EventRegistration;
