const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');

// Get all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        // 500 - Error on server/DB, not issue with user/client
        res.status(500).json({ message: err.message });
    }
});
// Get one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});
// Create one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        // 201 - successfully created an object
        res.status(201).json(newSubscriber);
    } catch(err) {
        // 400 - something wrong with users input
        res.status(400).json({ message: err.message });
    }
});
// Update one
// Put copies whole new object again and replaced, patch just updates the changed information
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'deleted subscriber'});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null) {
            return res.status(404).json({ message: 'cannot find subscriber'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
};

module.exports = router;