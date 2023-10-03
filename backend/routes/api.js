/* eslint-disable no-undef */
const express = require('express')
const multer = require('multer');
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');
const EventStatusController = require('../controllers/EventStatusController');
const router = express.Router()


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
// Create the multer instance
const upload = multer({ storage: storage });


//UserController
router.post('/register',UserController.userRegister)


//EventController
router.post('/event',upload.single('file'),EventController.storeEvent)
router.get('/event',EventController.fetchEvents)
router.get('/event/:id',EventController.fetchEvent)
router.post('/event/:id',upload.single('file'),EventController.updateEvent)
router.get('/delete-event/:id',EventController.deleteEvent)


// EventStatusController
router.post('/eventStatus',EventStatusController.storeEventStatus)
router.get('/fetchEventStatus',EventStatusController.fetchEventStatus)




module.exports = router