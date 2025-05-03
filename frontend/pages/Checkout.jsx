import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch cart items from backend or localStorage
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cart');
        setCart(res.data.cartItems || []);
      } catch (err) {
        setError('Failed to load cart');
      }
    };
    fetchCart();
  }, []);

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/api/orders/create-checkout-session', {
        cart,
        shipping,
      });
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <h3>Shipping Information</h3>
      <input name="address" placeholder="Address" value={shipping.address} onChange={handleShippingChange} />
      <input name="city" placeholder="City" value={shipping.city} onChange={handleShippingChange} />
      <input name="postalCode" placeholder="Postal Code" value={shipping.postalCode} onChange={handleShippingChange} />
      <input name="country" placeholder="Country" value={shipping.country} onChange={handleShippingChange} />
      <h3>Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>{item.title} x {item.quantity} (${item.price * item.quantity})</li>
        ))}
      </ul>
      <button onClick={handlePayment} disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? 'Processing...' : 'Pay with Card'}
      </button>
    </div>
  );
};

export default Checkout;
