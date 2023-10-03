/* eslint-disable no-undef */
const mongoose = require('mongoose')


const eventStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'EventModel',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var EventStatusModel = mongoose.model('eventStatuses',eventStatusSchema)
module.exports = EventStatusModel