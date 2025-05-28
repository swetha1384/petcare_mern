import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/login', { email, password })
      .then(result => {
        if (result.data.status === 'success') {
          localStorage.setItem('userEmail', result.data.email); // Store the user's email in localStorage
          navigate('/dashboard');
        } else {
          setErrorMessage(result.data);
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className='signup-background'>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="logincontent">
            <h1 className='text-3xl font-semibold'>Login</h1>
            <input className="email" type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br></br>
            <input className="email" type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br></br>
            <button className="lgnbtn" type="submit">Login</button><br></br>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Render error message if present */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
