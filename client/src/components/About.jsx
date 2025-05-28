import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='showbackabout'>
      <div className='nav'>
        <nav>
          <Link to="/dashboard"><i className="fas fa-paw"></i> Product</Link>
          <Link to="/showtask"><i className="fas fa-calendar-alt"></i> Schedule</Link>
          <Link to="/about"><i className="fas fa-info-circle"></i> About</Link>
          <Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link>
          <Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
          <img className="navimg" src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg" alt="image" />
        </nav>
      </div>
      <br /><br />
      <div className="about-container">
        <h1>About PetCare</h1>
        <p>
          Welcome to PetCare, your one-stop solution for all your pet care needs. Our app is designed to help pet owners and pet shops manage their pet care tasks efficiently. With PetCare, you can schedule tasks for your pets and receive notifications when the task date arrives. Additionally, you can buy food products for your pets through our app.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Task Scheduling: Schedule and manage tasks for your pets with ease.</li>
          <li>Notifications: Get notified when it's time to complete a scheduled task.</li>
          <li>Food Products: Browse and purchase food products for your pets.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
