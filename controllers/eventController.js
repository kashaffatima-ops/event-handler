const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, userId: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id }).sort('date');
        res.json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
