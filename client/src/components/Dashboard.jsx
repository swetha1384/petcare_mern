import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [clickedButton, setClickedButton] = useState(null);

    useEffect(() => {
        // Fetch product data from the server
        axios.get('http://localhost:7000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const addToCart = (product, index) => {
        axios.post('http://localhost:7000/cart', product)
            .then(result => {
                console.log(result);
                setClickedButton(index);
                setTimeout(() => setClickedButton(null), 500); // Remove the class after 0.5 seconds
            })
            .catch(err => console.log(err));
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter(product => 
        product.pet_variety && product.pet_variety.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000, // Slower transition speed
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Longer delay between slides
    };

    return (
        <div className='dashboard'>
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
            <div className='banner'>
                <Slider {...sliderSettings}>
                    <div className='flex flex-col gap-2'>
                        <div className='slide-content'>
                            <div><img className='allproimages1' src="https://img.freepik.com/premium-photo/cartoon-cat-with-blue-eyes-blue-background_881695-6449.jpg" alt="" /></div>
                            <div className='slide-description'>
                                <h1>Charming Cat</h1>
                                <p>Our cats are playful, curious, and perfect for companionship.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='slide-content'>
                            <img className='allproimages1' src="https://img.freepik.com/premium-photo/cartoon-dog-with-yellow-background_881695-12911.jpg" alt="" />
                            <div className='slide-description'>
                                <h1>Loyal Dog</h1>
                                <p>Our dogs are loyal, friendly, and always ready for a game of fetch.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='slide-content'>
                            <img className='allproimages1' src="https://img.freepik.com/premium-photo/cartoon-fish-with-yellow-fins-blue-background_877188-376.jpg" alt="" />
                            <div className='slide-description'>
                                <h1>Colorful Fish</h1>
                                <p>Our fish are vibrant, peaceful, and bring life to any aquarium.</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
            <br />
            <input 
                className='search' 
                type='text' 
                placeholder='Search by pet variety'
                value={searchQuery}
                onChange={handleSearch}
            />
            <div className='flex flex-col gap-10'>
                <div className='flex flex-wrap gap-20'>
                    {filteredProducts.map((product, index) => (
                        <div key={`${product.imageUrl}-${index}`} className='product-card'>
                            <div><img className='fetchimage' src={product.imageUrl} alt="Product Image" /></div>
                            <div className='product-details'>
                                <div className='product-description'>Pet Variety : {product.pet_variety}</div>
                                <div className='product-description'>{product.description}</div>
                                <div className='product-price'>Rate: {product.price}/-</div>
                            </div>
                            <div>
                                <button 
                                    className={`button product-button ${clickedButton === index ? 'clicked' : ''}`}
                                    onClick={() => addToCart(product, index)}
                                >
                                    Add to cart
                                </button>
                            </div>
                            {(index + 1) % 3 === 0 && <div className="w-full" />} {/* Add a spacer div after every third product */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
