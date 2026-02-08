import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { autoSeedDatabase } from './config/seedData.js';
import authRoutes from './routes/auth.js';
import pizzaRoutes from './routes/pizzas.js';
import orderRoutes from './routes/orders.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
    // Auto-seed database if empty (for free tier deployments)
    autoSeedDatabase();
});

const app = express();

// CORS configuration for development and production
const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL // Add your Render frontend URL here
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Pizza Delivery API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
