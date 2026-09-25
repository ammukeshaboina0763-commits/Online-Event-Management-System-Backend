const express=require('express')
const router=express.Router()
const{
     createEvent,
    getAllEvents,
    addAttendee,
    deleteAttendee,
    getEventStats
}=require('../controller/eventcontroller');

router.post('/', createEvent);

router.get('/', getAllEvents);

router.post('/:id/attendees', addAttendee);

router.delete('/:id/attendees/:index', deleteAttendee);

router.get('/stats/category', getEventStats);


module.exports = router;