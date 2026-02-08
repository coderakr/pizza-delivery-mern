import express from 'express';
import Pizza from '../models/Pizza.js';

const router = express.Router();

// @route   GET /api/pizzas
// @desc    Get all pizzas
// @access  Public
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find({ available: true });
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/pizzas/:id
// @desc    Get single pizza
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (pizza) {
            res.json(pizza);
        } else {
            res.status(404).json({ message: 'Pizza not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/pizzas
// @desc    Create a pizza (for seeding/admin)
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
    try {
        const pizza = await Pizza.create(req.body);
        res.status(201).json(pizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
