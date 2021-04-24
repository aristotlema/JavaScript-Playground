const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true

    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now

    }
});

// (name of model in DB, then the object)
module.exports = mongoose.model('Subscriber', subscribersSchema);