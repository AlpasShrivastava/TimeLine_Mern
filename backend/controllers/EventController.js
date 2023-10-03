/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
const EventModel = require("../models/Event")

class EventController {

    static fetchEvents = async(req,res) => {
        try {
            const data = await EventModel.find().sort({ _id: -1 })
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static fetchEvent = async(req,res) => {
        try {
            const data = await EventModel.findById(req.params.id)
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static storeEvent = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const {title, description, user} = req.body
            const file = req.file.path

            const data = new EventModel({
                title: title,
                description: description,
                file: file,
                user: user,
            })

            await data.save()
            res.status(201).json({ 'status': 'success', 'message': 'Event Saved Successfully!' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static updateEvent = async(req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.file);
            var {title, description} = req.body
            if (req.file != undefined) {
                var file = req.file.path
    
                var data = await EventModel.findByIdAndUpdate(req.params.id, {
                    title: title,
                    description: description,
                    file: file,
                })
            } else {
                var data = await EventModel.findByIdAndUpdate(req.params.id, {
                    title: title,
                    description: description,
                })
            }

            await data.save()
            res.status(201).json({ 'status': 'success', 'message': 'Event Updated Successfully!' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

    static deleteEvent = async(req,res) => {
        try {
            const deleteProject = await EventModel.findByIdAndDelete(req.params.id)

            if (deleteProject) {
                res.status(201).json({ 'status': 'success', 'message': 'Project Deleted Successfully!' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Project Deleted but Feature Images did not deleted!' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': err })
        }
    }

}
module.exports = EventController