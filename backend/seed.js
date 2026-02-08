import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pizza from './models/Pizza.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const pizzas = [
    {
        name: 'Margherita',
        description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
        price: 299,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
        category: 'Vegetarian',
        sizes: [
            { size: 'Small', price: 199 },
            { size: 'Medium', price: 299 },
            { size: 'Large', price: 399 }
        ]
    },
    {
        name: 'Pepperoni',
        description: 'Loaded with pepperoni, mozzarella cheese, and tomato sauce',
        price: 399,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        category: 'Non-Vegetarian',
        sizes: [
            { size: 'Small', price: 299 },
            { size: 'Medium', price: 399 },
            { size: 'Large', price: 499 }
        ]
    },
    {
        name: 'Veggie Supreme',
        description: 'Bell peppers, onions, mushrooms, olives, and tomatoes',
        price: 349,
        image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500',
        category: 'Vegetarian',
        sizes: [
            { size: 'Small', price: 249 },
            { size: 'Medium', price: 349 },
            { size: 'Large', price: 449 }
        ]
    },
    {
        name: 'BBQ Chicken',
        description: 'Grilled chicken, BBQ sauce, onions, and cilantro',
        price: 449,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
        category: 'Non-Vegetarian',
        sizes: [
            { size: 'Small', price: 349 },
            { size: 'Medium', price: 449 },
            { size: 'Large', price: 549 }
        ]
    },
    {
        name: 'Hawaiian',
        description: 'Ham, pineapple, mozzarella, and tomato sauce',
        price: 379,
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500',
        category: 'Non-Vegetarian',
        sizes: [
            { size: 'Small', price: 279 },
            { size: 'Medium', price: 379 },
            { size: 'Large', price: 479 }
        ]
    },
    {
        name: 'Four Cheese',
        description: 'Mozzarella, parmesan, gorgonzola, and ricotta cheese',
        price: 429,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        category: 'Vegetarian',
        sizes: [
            { size: 'Small', price: 329 },
            { size: 'Medium', price: 429 },
            { size: 'Large', price: 529 }
        ]
    },
    {
        name: 'Spicy Paneer',
        description: 'Paneer cubes, jalapeños, onions, and spicy sauce',
        price: 369,
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500',
        category: 'Vegetarian',
        sizes: [
            { size: 'Small', price: 269 },
            { size: 'Medium', price: 369 },
            { size: 'Large', price: 469 }
        ]
    },
    {
        name: 'Meat Lovers',
        description: 'Pepperoni, sausage, bacon, ham, and ground beef',
        price: 499,
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500',
        category: 'Non-Vegetarian',
        sizes: [
            { size: 'Small', price: 399 },
            { size: 'Medium', price: 499 },
            { size: 'Large', price: 599 }
        ]
    },
    {
        name: 'Mushroom Truffle',
        description: 'Mixed mushrooms, truffle oil, mozzarella, and arugula',
        price: 479,
        image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500',
        category: 'Vegan',
        sizes: [
            { size: 'Small', price: 379 },
            { size: 'Medium', price: 479 },
            { size: 'Large', price: 579 }
        ]
    },
    {
        name: 'Tandoori Chicken',
        description: 'Tandoori chicken, onions, peppers, and mint chutney',
        price: 459,
        image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96800?w=500',
        category: 'Special',
        sizes: [
            { size: 'Small', price: 359 },
            { size: 'Medium', price: 459 },
            { size: 'Large', price: 559 }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await Pizza.deleteMany();
        console.log('Pizzas deleted');

        await Pizza.insertMany(pizzas);
        console.log('Pizzas seeded successfully');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
