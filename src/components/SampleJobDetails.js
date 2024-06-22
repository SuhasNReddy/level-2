import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import styles from '../styles/AllEventDetails.module.css';

import sampleData from '../Data/SampleData';

const SampleJobDetails = () => {
    const allEvents=sampleData;
  return (
    <div className={styles.allEventDetailsContainer}>
      {allEvents.length > 0 ? (
        <div>
          <div className={styles.additionalClass}>
            <p>Email</p>
            <p>Position</p>
            <p>Experience</p>
          </div>

          {allEvents.map((event, index) => (
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

export default SampleJobDetails;
