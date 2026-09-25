const Event = require('../models/eventModel');


// 4.1 Add Event
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4.2 Get All Events with filters
const getAllEvents = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        const filter = {};

        // Search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: 'i'
            };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Pagination
        const skip = (page - 1) * limit;

        const events = await Event.find(filter)
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4.3 Add Attendee
const addAttendee = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        event.attendees.push(req.body);

        await event.save();

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4.4 Delete Attendee
const deleteAttendee = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        const index = Number(req.params.index);

        if (index < 0 || index >= event.attendees.length) {
            return res.status(404).json({
                message: 'Attendee not found'
            });
        }

        event.attendees.splice(index, 1);

        await event.save();

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4.5 Category Stats
const getEventStats = async (req, res) => {
    try {
        const stats = await Event.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        res.status(200).json(stats);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createEvent,
    getAllEvents,
    addAttendee,
    deleteAttendee,
    getEventStats
};
