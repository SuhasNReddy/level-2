import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/EventRegistrationFrom.module.css'; // Import the CSS module

// Validation functions
const validate = (name, email, phoneNumber) => {
  let validationErrors = {};

  if (!name.trim()) {
    validationErrors.name = 'Full Name is required';
  }

  if (!email) {
    validationErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validationErrors.email = 'Email is invalid';
  }

  if (!phoneNumber) {
    validationErrors.phoneNumber = 'Phone Number is required';
  } else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phoneNumber)) {
    validationErrors.phoneNumber = 'Phone Number is invalid';
  }

  return validationErrors;
};


const validateJobInfo = (position, experience, portfolioUrl, managementExperience, additionalSkills, interviewTime) => {
  let validationErrors = {};

  if (!position) validationErrors.position = 'Applying for Position is required';

  if ((position === 'Developer' || position === 'Designer') && (!experience || experience < 0))
    validationErrors.experience = 'Relevant Experience is required and must be a number greater than 0';

  if ((position === 'Developer' || position === 'Designer') && experience >= 100)
    validationErrors.experience = 'Relevant Experience must be below 100';

  if (position === 'Designer' && !portfolioUrl)
    validationErrors.portfolioUrl = 'Portfolio URL is required';
  else if (portfolioUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(portfolioUrl))
    validationErrors.portfolioUrl = 'Portfolio URL is invalid';

  if (position === 'Manager' && (!managementExperience || managementExperience < 0))
    validationErrors.managementExperience = 'Management Experience is required and must be a number greater than 0';

  if (position === 'Manager' && managementExperience >= 100)
    validationErrors.managementExperience = 'Management Experience must be below 100';

  if (additionalSkills.length === 0)
    validationErrors.additionalSkills = 'At least one skill must be selected';

  if (!interviewTime)
    validationErrors.interviewTime = 'Preferred Interview Time is required';
  else {
    const interviewDateTime = new Date(interviewTime);
    if (isNaN(interviewDateTime.getTime()))
      validationErrors.interviewTime = 'Preferred Interview Time must be a valid date and time';
  }

  return validationErrors;
};



const EventRegistrationForm = ({ setAllEvents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [managementExperience, setManagementExperience] = useState('');
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [interviewTime, setInterviewTime] = useState('');
  const [errors, setErrors] = useState({});
  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);

  const navigate = useNavigate();

  const generateUniqueId = () => {
    // Simple unique ID generator using current timestamp
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmitPersonalInfo = (e) => {
    e.preventDefault();
    const validationErrors = validate(name, email, phoneNumber);
    if (Object.keys(validationErrors).length === 0) {
      setPersonalInfoSubmitted(true);
    } else {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
    }
  };

  const handleSubmitJobInfo = (e) => {
    e.preventDefault();
    const validationErrors = validateJobInfo(position, experience, portfolioUrl, managementExperience, additionalSkills, interviewTime);
    if (Object.keys(validationErrors).length === 0) {
      const eventId = generateUniqueId(); // Generate unique ID
      const eventData = {
        id: eventId,
        name,
        email,
        phoneNumber,
        position,
        experience,
        portfolioUrl,
        managementExperience,
        additionalSkills,
        interviewTime,
        dateTime: new Date().toLocaleString() // Store current date and time
      };
      setAllEvents(prevEvents => [...prevEvents, eventData]); // Update events array
      toast.success('Form submitted successfully!');
      console.log(eventData);
      // Clear form fields and reset state
      setName('');
      setEmail('');
      setPhoneNumber('');
      setPosition('');
      setExperience('');
      setPortfolioUrl('');
      setManagementExperience('');
      setAdditionalSkills([]);
      setInterviewTime('');
      setErrors({});
      
      setTimeout(() => {
        navigate('/allJobDetails');
      }, 1500); 
    } else {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAdditionalSkills([...additionalSkills, value]);
    } else {
      setAdditionalSkills(additionalSkills.filter(skill => skill !== value));
    }
  };

  // Get current date and time for setting the minimum date-time
  const currentDateTime = new Date().toISOString().slice(0, 16);

  // Set a maximum date-time (e.g., one year from now)
  const maxDateTime = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16);

  return (
    <div className={styles.container}>
      {!personalInfoSubmitted ? (
        <form onSubmit={handleSubmitPersonalInfo} className={styles.formContainer}>
          <div className={styles.formFields}>
            <h3>Personal Info</h3>
            <label className={styles.formLabel}>
              <div>Full Name:</div>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
              </div>
            </label>
            <label className={styles.formLabel}>
              <div>Email:</div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>
            </label>
            <label className={styles.formLabel}>
              <div>Phone Number:</div>
              <div>
                <input
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phoneNumber"
                />
              </div>
            </label>
            <button className={styles.submitButton} type="submit">Next</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitJobInfo} className={styles.formContainer}>
          <div className={styles.formFields}>
            <h3>Job Info</h3>
            <label className={`${styles.formLabel} ${styles.datetimeInputContainer}`}>
              <div>Preferred Interview Time:</div>
              <div>
                <input
                  type="datetime-local"
                  className={styles.datetimeInput}
                  value={interviewTime}
                  min={currentDateTime}
                  max={maxDateTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  name="interviewTime"
                />
              </div>
            </label>
            <label className={`${styles.formLabel} ${styles.dropdownContainer}`}>
              <div>Applying for Position:</div>
              <div>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  name="position"
                  className={styles.dropdownInput}
                >
                  <option value="">Select Position</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </label>
            {(position === 'Developer' || position === 'Designer') && (
              <label className={styles.formLabel}>
                <div>Relevant Experience (years):</div>
                <div>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    name="experience"
                  />
                </div>
              </label>
            )}
            {position === 'Designer' && (
              <label className={styles.formLabel}>
                <div>Portfolio URL:</div>
                <div>
                  <input
                    type="text"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    name="portfolioUrl"
                  />
                </div>
              </label>
            )}
            {position === 'Manager' && (
              <label className={styles.formLabel}>
                <div>Management Experience:</div>
                <div>
                  <input
                    type="text"
                    value={managementExperience}
                    onChange={(e) => setManagementExperience(e.target.value)}
                    name="managementExperience"
                  />
                </div>
              </label>
            )}
            
            <label className={styles.formLabel}>
              <div>Additional Skills:</div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="JavaScript"
                    checked={additionalSkills.includes('JavaScript')}
                    onChange={handleCheckboxChange}
                  />
                  JavaScript
                  </label>
                <label>
                  <input
                    type="checkbox"
                    value="CSS"
                    checked={additionalSkills.includes('CSS')}
                    onChange={handleCheckboxChange}
                  />
                  CSS
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Python"
                    checked={additionalSkills.includes('Python')}
                    onChange={handleCheckboxChange}
                  />
                  Python
                </label>
              </div>
            </label>
            <button className={styles.submitButton} type="submit">Submit</button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default EventRegistrationForm;
