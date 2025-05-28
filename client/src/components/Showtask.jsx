import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import delete1 from '../images/delete.png';

export default function Showtask() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:7000/showtask')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const deleteTask = async (taskId) => {
        try {
          await axios.delete(`http://localhost:7000/deleteTask/${taskId}`);
          setProducts(prevProducts => prevProducts.filter(product => product._id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
    };

    return (
        <div className='showtaskback'>
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
            <div>
                <Link to="/addtask"><button className='shwtskbtn'>Add more task</button></Link>
            </div>
            {products.map(product => (
                <div className='showtask' key={product._id}>
                    <div className='content'>
                        <div className='label-content'><b>Pet Variety:</b> {product.variety}</div>
                        <div className='label-content'><b>Task:</b> {product.task}</div>
                        <div className='label-content'><b>Date:</b> {product.date}</div>
                    </div>
                    <img onClick={() => deleteTask(product._id)} className='deleteimg' src={delete1} alt="delete" />
                    <input className="checkbox" type="checkbox" />
                </div>
            ))}
        </div>
    );
}
