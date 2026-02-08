import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (pizza, size, quantity = 1) => {
        const sizeInfo = pizza.sizes.find(s => s.size === size);
        const price = sizeInfo ? sizeInfo.price : pizza.price;

        const existingItem = cartItems.find(
            item => item.pizza._id === pizza._id && item.size === size
        );

        if (existingItem) {
            setCartItems(
                cartItems.map(item =>
                    item.pizza._id === pizza._id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCartItems([
                ...cartItems,
                {
                    pizza,
                    size,
                    quantity,
                    price
                }
            ]);
        }
    };

    const removeFromCart = (pizzaId, size) => {
        setCartItems(cartItems.filter(
            item => !(item.pizza._id === pizzaId && item.size === size)
        ));
    };

    const updateQuantity = (pizzaId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(pizzaId, size);
        } else {
            setCartItems(
                cartItems.map(item =>
                    item.pizza._id === pizzaId && item.size === size
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
