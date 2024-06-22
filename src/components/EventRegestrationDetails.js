import React from 'react';
import styles from '../styles/EventRegistrationDetail.module.css'; // Import CSS module
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome CSS

const EventRegistrationDetail = ({ allEvents }) => {
  const { id } = useParams();

  
  const event = allEvents.find(event => event.id === id) || sampleData.find(event => event.id === id);

  if (!event) {
    return <p className={styles.noEventMessage}>Event registration not found</p>;
  }

  const {
    name,
    email,
    phoneNumber,
    position,
    experience,
    portfolioUrl,
    managementExperience,
    additionalSkills,
    interviewTime,
    dateTime,
  } = event;

  const formattedDateTime = new Date(interviewTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.eventRegistrationDetail}>
      <h3>Job Details</h3>
      <div className={styles.mainCon}>
        <div className={`${styles.detailItem} ${styles.userName}`}>
          {name}
        </div>

        <div className={`${styles.expDetails}`}>
          <div className={`${styles.detailItem}`}>
            {position}
          </div>
          
          <div className={`${styles.detailItem}`}>
            {experience || managementExperience} years
          </div>
        </div>

        <div className={`${styles.detailItem}`}>
          {additionalSkills.map((skill, index) => (
            <span key={index}>
              {skill} {index < additionalSkills.length - 1 && '| '}
            </span>
          ))}
        </div>

        {position === 'Designer' ? (
          <div className={`${styles.detailItem}`}>
            <a href={portfolioUrl}>Portfolio</a>
          </div>
        ) : null}

        
        
        <div className={styles.contactDetails}>
          <div className={`${styles.contactItem}`} title={email}>
            <i className="fas fa-envelope"></i> 
            {/* <span className={styles.contactText}>{email}</span> */}
          </div>
          <div className={`${styles.contactItem}`} title={phoneNumber}>
            <i className="fas fa-phone"></i> 
            {/* <span className={styles.contactText}>{phoneNumber}</span> */}
          </div>
        </div>
      </div>
      <div className={`${styles.interviewDetails} `}>
        <p>Interview Scheduled on</p> <span>{formattedDateTime}</span> 
      </div>
      <div className={`${styles.postedOn}`}>
        Posted on {dateTime}
      </div>
    </div>
  );
};

export default EventRegistrationDetail;
