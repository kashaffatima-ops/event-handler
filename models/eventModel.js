const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    description: String,
    category: { type: String, enum: ['Meeting', 'Birthday', 'Appointment'], required: true },
    date: Date,
    reminderTime: Date
});

module.exports = mongoose.model('Event', EventSchema);
