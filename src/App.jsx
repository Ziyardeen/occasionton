import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/NotFound';
import LogIn from './pages/authPages/LogIn';

import SignUp from './pages/authPages/SignUp';
import Verify from './pages/authPages/Verify';

import EventsList from './pages/features/EventsList';
import EventDetail from './pages/features/EventDetail';
import StaffDashboard from './pages/features/StaffDashboard';
import UserProfile from './pages/features/UserProfile';
import Homepage from './pages/features/Homepage';
import EventRegistration from './pages/features/EventRegistration';
import RegistrationConfirmation from './pages/features/RegistrationConfirmation';
import ProtectedRoute from './pages/authPages/protectedRoute/ProtectedRoute';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from './appwrite/authentication';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/verify' element={<Verify />} />

          <Route path='/homepage' element={<Homepage />} />
          <Route path='/events' element={<EventsList />} />
          <Route path='/events/:event_id' element={<EventDetail />} />
          <Route path='/staff-dashboard' element={<StaffDashboard />} />
          <Route path='/profile' element={<UserProfile />} />

          <Route
            path='/events/:eventId/register'
            element={
              <ProtectedRoute>
                {' '}
                <EventRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path='/events/:eventId/confirmation'
            element={
              <ProtectedRoute>
                {' '}
                <RegistrationConfirmation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
