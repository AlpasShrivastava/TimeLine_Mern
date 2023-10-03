/* eslint-disable no-undef */
const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var EventModel = mongoose.model('events',eventSchema)
module.exports = EventModel