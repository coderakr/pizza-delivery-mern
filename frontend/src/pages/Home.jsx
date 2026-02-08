import { useState, useEffect } from 'react';
import api from '../utils/api';
import PizzaCard from '../components/PizzaCard';
import './Home.css';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPizzas();
    }, []);

    const fetchPizzas = async () => {
        try {
            const { data } = await api.get('/api/pizzas');
            setPizzas(data);
        } catch (err) {
            setError('Failed to load pizzas. Please try again later.');
        } finally {
            setLoading(false);
        }
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

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title fade-in">🍕 Fresh & Hot Pizzas</h1>
                    <p className="hero-subtitle fade-in">Delivered to your doorstep in 30 minutes or less!</p>
                </div>
            </div>

            <div className="container">
                <section className="menu-section">
                    <h2 className="section-title">Our Menu</h2>

                    {pizzas.length === 0 ? (
                        <div className="empty-state">
                            <p>No pizzas available at the moment. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="pizza-grid grid grid-3">
                            {pizzas.map((pizza) => (
                                <PizzaCard key={pizza._id} pizza={pizza} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
