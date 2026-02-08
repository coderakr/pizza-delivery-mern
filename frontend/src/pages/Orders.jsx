import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get('/api/orders', config);
            setOrders(data);
        } catch (err) {
            setError('Failed to load orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'warning',
            'Confirmed': 'primary',
            'Preparing': 'primary',
            'Out for Delivery': 'success',
            'Delivered': 'success',
            'Cancelled': 'error'
        };
        return colors[status] || 'primary';
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container" style={{ marginTop: '3rem' }}>
                <div className="empty-orders fade-in">
                    <div className="empty-orders-icon">📦</div>
                    <h2>No orders yet</h2>
                    <p>Start ordering some delicious pizzas!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <h1 className="page-title">My Orders</h1>

                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card card fade-in">
                            <div className="order-header">
                                <div>
                                    <h3>Order #{order._id.slice(-8)}</h3>
                                    <p className="order-date">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <span className={`badge badge-${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item-row">
                                        <span className="item-name">
                                            {item.name} ({item.size})
                                        </span>
                                        <span className="item-quantity">× {item.quantity}</span>
                                        <span className="item-price">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-details">
                                    <p><strong>Delivery Address:</strong></p>
                                    <p>
                                        {order.deliveryAddress.street}, {order.deliveryAddress.city},<br />
                                        {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}
                                    </p>
                                    <p><strong>Phone:</strong> {order.phone}</p>
                                    <p><strong>Payment:</strong> {order.paymentMethod}</p>
                                </div>
                                <div className="order-total">
                                    <span>Total Amount</span>
                                    <span className="total-amount">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
