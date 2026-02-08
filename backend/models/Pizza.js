import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a pizza name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    category: {
        type: String,
        enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Special'],
        default: 'Vegetarian'
    },
    sizes: [{
        size: {
            type: String,
            enum: ['Small', 'Medium', 'Large'],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;
