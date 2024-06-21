import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import styles from '../styles/AllEventDetails.module.css';

const AllEventDetails = ({ allEvents }) => {
  const positionsToFilter = ['Developer', 'Designer', 'Manager'];

  const [selectedPosition, setSelectedPosition] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [minExperience, setMinExperience] = useState(0);

  const filteredEvents = allEvents.filter(event => {
    const positionFilterPassed = !selectedPosition || event.position === selectedPosition;
    const emailSearchPassed = !searchEmail || event.email.toLowerCase().includes(searchEmail.toLowerCase());
    const minExperiencePassed = event.position !== 'Manager' || event.experience >= minExperience || event.managementExperience >= minExperience;

    return positionFilterPassed && emailSearchPassed && minExperiencePassed;
  });

  const handlePositionFilterChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  const handleEmailSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleMinExperienceChange = (e) => {
    setMinExperience(parseInt(e.target.value) || 0);
  };

  return (
    <div className={styles.allEventDetailsContainer}>
      <div className={styles.filterClass}>
        <div className={styles.emailSearch}>
          <input
            id="emailSearch"
            type="text"
            value={searchEmail}
            onChange={handleEmailSearchChange}
            placeholder="Enter email"
          />
        </div>

        <div className={styles.positionFilter}>
          <select id="positionFilter" value={selectedPosition} onChange={handlePositionFilterChange}>
            <option value="">All Positions</option>
            {positionsToFilter.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        <div className={styles.minExperienceFilter}>
          <input
            id="minExperience"
            type="number"
            value={minExperience}
            onChange={handleMinExperienceChange}
            min="0"
          />
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div>
          <div className={styles.additionalClass}>
            <p>Email</p>
            <p>Position</p>
            <p>Experience</p>
          </div>

          {filteredEvents.map((event, index) => (
            <Link key={index} to={`/jobdetail/${event.id}`} className={styles.jobOverview}>
              <p>{event.email}</p>
              <p>{event.position}</p>
              {event.position === 'Manager' ? (
                <p>{event.managementExperience}</p>
              ) : (
                <p>{event.experience} years</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.noEventsMessage}>No registrations yet</p>
      )}
    </div>
  );
};

export default AllEventDetails;
