import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    // Fetch product data from the server
    axios.get('http://localhost:7000/getcart')
      .then(response => {
        setCarts(response.data);
      })
      .catch(error => {
        console.error('Error fetching carts', error);
      });
  }, []);

  // Function to handle item removal
  const handleRemove = (id) => {
    axios.delete(`http://localhost:7000/deletecart/${id}`)
      .then(response => {
        // Remove the item from the state
        setCarts(carts.filter(cart => cart._id !== id));
      })
      .catch(error => {
        console.error('Error deleting cart item', error);
      });
  };

  // Calculate the total price
  const totalPrice = carts.reduce((total, cart) => total + parseFloat(cart.price), 0);

  return (
    <div className='showbackcart'>
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
      <div className="cart-container ">
        <h1>Shopping Cart</h1>
        <div className="cart-total">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>
        <div className="cart-items">
          {carts.map((cart, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <div className='flex flex-row cart-row'>
                  <div><img className='cartimg' src={cart.imageUrl} alt={cart.description} /></div>
                  <div className='flex flex-col desprice'>
                    <h6>{cart.description}</h6>
                    <div>price: ${cart.price}</div>
                  </div>
                  <div className='removebtn'>
                    <button onClick={() => handleRemove(cart._id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;