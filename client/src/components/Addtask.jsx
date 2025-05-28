import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

export default function Addtask() {
  const [variety, setVariety] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!variety || !task || !date) {
      setError("All fields are required");
      return;
    }

    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email from localStorage

    axios.post('http://localhost:7000/addtask', { variety, task, date, userEmail }) // Include the user's email in the request
      .then(result => {
        setMessage("Task added successfully!");
        setError(null);
        navigate("/showtask");
      })
      .catch(err => {
        setError("An error occurred while adding the task.");
        console.log(err);
      });
  };

  return (
    <div className='showbackaddtask'>
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
      <div className="add-task-container">
        <form onSubmit={handleSubmit} className="add-task-form">
          <h2>Add a New Task</h2>
          <div className="form-group">
            <label>Pet Variety:</label>
            <input
              type='text'
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Task:</label>
            <input
              type='text'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="tskbtn" type='submit'>Add Task</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="navigation-links">
          <Link to="/showtask">Back to Task List</Link>
        </div>
      </div>
    </div>
  );
}
