const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    brandId: {
        type: Number,
        required: true
    }
});

ProductSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('product', ProductSchema);