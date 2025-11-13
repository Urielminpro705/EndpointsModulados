const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

CategorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('category', CategorySchema);