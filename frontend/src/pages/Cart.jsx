import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ marginTop: '3rem' }}>
                <div className="empty-cart fade-in">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some delicious pizzas to get started!</p>
                    <Link to="/" className="btn btn-primary">Browse Menu</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="page-title">Shopping Cart</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.pizza._id}-${item.size}`} className="cart-item fade-in">
                                <img src={item.pizza.image} alt={item.pizza.name} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <h3>{item.pizza.name}</h3>
                                    <p className="cart-item-size">Size: {item.size}</p>
                                    <p className="cart-item-price">₹{item.price} each</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.pizza._id, item.size, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.pizza._id, item.size, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="cart-item-total">
                                        ₹{item.price * item.quantity}
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.pizza._id, item.size)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary card">
                        <h3>Order Summary</h3>

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

                        <Link to="/checkout" className="btn btn-success btn-block">
                            Proceed to Checkout
                        </Link>

                        <button onClick={clearCart} className="btn btn-secondary btn-block">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
