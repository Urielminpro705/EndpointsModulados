const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    brandName: {
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

BrandSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('brand', BrandSchema);