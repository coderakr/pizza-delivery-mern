import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    pizza: item.pizza._id,
                    name: item.pizza.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: getCartTotal() + 40, // Including delivery fee
                deliveryAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode
                },
                phone: formData.phone
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            clearCart();
            navigate(`/orders`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>

                <div className="checkout-layout">
                    <div className="checkout-form-section">
                        <div className="card">
                            <h2>Delivery Information</h2>

                            {error && <div className="alert alert-error">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Street Address</label>
                                    <input
                                        type="text"
                                        name="street"
                                        className="form-input"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                        placeholder="123 Main Street"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-input"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            placeholder="Mumbai"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            className="form-input"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        className="form-input"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                        placeholder="400001"
                                    />
                                </div>

                                <div className="payment-info">
                                    <h3>Payment Method</h3>
                                    <div className="payment-option">
                                        <span className="payment-icon">💵</span>
                                        <div>
                                            <strong>Cash on Delivery</strong>
                                            <p>Pay when you receive your order</p>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success btn-block" disabled={loading}>
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="order-summary-section">
                        <div className="card">
                            <h3>Order Summary</h3>

                            <div className="order-items">
                                {cartItems.map((item) => (
                                    <div key={`${item.pizza._id}-${item.size}`} className="order-item">
                                        <img src={item.pizza.image} alt={item.pizza.name} />
                                        <div className="order-item-info">
                                            <h4>{item.pizza.name}</h4>
                                            <p>{item.size} × {item.quantity}</p>
                                        </div>
                                        <span className="order-item-price">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{getCartTotal()}</span>
                            </div>

                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span>₹40</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>₹{getCartTotal() + 40}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
