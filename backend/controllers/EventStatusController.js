/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const EventStatusModel = require('../models/EventStatus');

class EventStatusController {
   
    static storeEventStatus = async(req,res) => {
        try{
            // console.log(req.body);
            const { status, event } = req.body

            const data = new EventStatusModel({
                event: event,
                status: status,
            })

            const dataSaved = await data.save()

            if (dataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Event Status Updated Successfully!' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Error, Try Again!' })
            }
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchEventStatus = async(req,res) => {
        try{
            const data = await EventStatusModel.aggregate([
                {
                    $lookup: {
                        from: 'events',
                        localField: 'event',
                        foreignField: '_id',
                        as: 'eventDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$eventDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        status: 1,
                        createdAt: 1,
                        'eventDetails.title': 1,
                        'eventDetails.description': 1,
                        'eventDetails.file': 1
                    }
                }
            ]);
            
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }
}
module.exports = EventStatusController