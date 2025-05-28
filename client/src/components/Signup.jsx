import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    axios.post('http://localhost:7000/register', { email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="signup-background">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="logincontent">
            <h1 className='text-3xl font-semibold'>Sign up</h1>
            <input className="email" type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br />
            <input className="email" type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br />
            <button className="lgnbtn" type="submit">Sign up</button><br />

            <div>or</div>

            <h6 className='text-xs'>Already have an account? <Link to="/login">Login</Link></h6>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
