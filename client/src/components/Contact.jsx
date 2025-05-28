import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/contact', { name, email, review })
      .then(result => {
        setMessage("Review sent successfully!");
        setError(null);
      })
      .catch(err => {
        setError("An error occurred while sending the review");
        console.log(err);
      });
  };

  return (
    <div className='con_bg'>
      <div className='dashboard'>
        <div className='nav'>
          <nav>
            <Link to="/dashboard"><i className="fas fa-paw"></i> Product</Link>
            <Link to="/showtask"><i className="fas fa-calendar-alt"></i> Schedule</Link>
            <Link to="/about"><i className="fas fa-info-circle"></i> About</Link>
            <Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link>
            <Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
            <img className="navimg" src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg" alt="Pets" />
          </nav>
        </div>
        <div className='flex flex-row gap-2'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-row'>
              <div>
                <img className='contactimg' src="https://t3.ftcdn.net/jpg/07/45/32/38/360_F_745323899_y3jkKfDY6CvJIpo39UmMJgHjk0jnMsJf.jpg" alt="Contact" />
              </div>
              <div className='contact-contents'>
                <h3>Contact us</h3><br></br>
                <div className='glassmorphism'> {/* This div adds the glassmorphism effect */}
                  <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' placeholder='Name' className='contact-input' onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' placeholder='Email' className='contact-input' onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='review'>Review:</label>
                    <textarea id='review' placeholder='Your message' className='contact-input contact-textarea' onChange={(e) => setReview(e.target.value)}></textarea>
                  </div>
                </div>
                <button className='send-button' type='submit'>Send</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
