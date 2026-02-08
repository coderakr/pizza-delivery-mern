import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './PizzaCard.css';

const PizzaCard = ({ pizza }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState(pizza.sizes?.[0]?.size || 'Medium');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        addToCart(pizza, selectedSize, 1);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const getPrice = () => {
        const sizeInfo = pizza.sizes?.find(s => s.size === selectedSize);
        return sizeInfo ? sizeInfo.price : pizza.price;
    };

    return (
        <div className="pizza-card fade-in">
            <div className="pizza-image-wrapper">
                <img src={pizza.image} alt={pizza.name} className="pizza-image" />
                <span className={`category-badge badge-${pizza.category?.toLowerCase()}`}>
                    {pizza.category}
                </span>
            </div>

            <div className="pizza-content">
                <h3 className="pizza-name">{pizza.name}</h3>
                <p className="pizza-description">{pizza.description}</p>

                {pizza.sizes && pizza.sizes.length > 0 && (
                    <div className="size-selector">
                        {pizza.sizes.map((size) => (
                            <button
                                key={size.size}
                                className={`size-btn ${selectedSize === size.size ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size.size)}
                            >
                                {size.size}
                            </button>
                        ))}
                    </div>
                )}

                <div className="pizza-footer">
                    <span className="pizza-price">₹{getPrice()}</span>
                    <button
                        className="btn btn-primary add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        {showSuccess ? '✓ Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaCard;
