import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/Navbar.module.css'; // Import the module CSS file

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>Logo</div>
      <ul>
        <li><NavLink  to="/" >Home</NavLink></li>
        <li><NavLink to="/allJobDetails" >All Job Applicaitions</NavLink></li>
        <li><NavLink to="/register" >Register</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
