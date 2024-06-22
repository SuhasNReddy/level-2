import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventRegistrationForm from './components/EventRegistrationFrom';
// import EventRegistrationDetails from './EventRegestrationDetails';
import AllEventDetails from './components/AllEventDetails';
import EventRegistrationDetail from './components/EventRegestrationDetails';
import SampleJobDetails from './components/SampleJobDetails';

function App() {
  const [allEvents, setAllEvents] = useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
              <Route path='/allJobDetails' element={<AllEventDetails allEvents={allEvents} />} />
              <Route path='/register' element={<EventRegistrationForm setAllEvents={setAllEvents} />} />
              <Route path='/jobDetail/:id' element={<EventRegistrationDetail allEvents={allEvents} />} />
              <Route path='/' element={<SampleJobDetails />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
