const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('user', UserSchema);