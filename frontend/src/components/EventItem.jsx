import { useState } from 'react';
import api from '../api';

function EventItem({ event, onEventUpdated }) {

    const [attendee, setAttendee] = useState({
        name: '',
        email: ''
    });

    const [showAttendeeForm, setShowAttendeeForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAttendee({
            ...attendee,
            [name]: value
        });
    };

    const handleAddAttendee = async (e) => {
        e.preventDefault();

        try {
            await api.post(`/${event._id}/attendees`, attendee);

            setAttendee({
                name: '',
                email: ''
            });

            setShowAttendeeForm(false);

            onEventUpdated();

        } catch (error) {
            console.log('Error adding attendee:', error);
        }
    };

    const handleDeleteAttendee = async (index) => {
        try {
            await api.delete(`/${event._id}/attendees/${index}`);

            onEventUpdated();

        } catch (error) {
            console.log('Error deleting attendee:', error);
        }
    };

    return (
        <div>
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>Category: {event.category}</p>

            <p>Location: {event.location}</p>

            <p>
                Date: {new Date(event.date).toLocaleDateString()}
            </p>

            <h3>Attendees</h3>

            {event.attendees.length === 0 ? (
                <p>No attendees yet.</p>
            ) : (
                <ul>
                    {event.attendees.map((attendee, index) => (
                        <li key={index}>
                            {attendee.name} - {attendee.email}

                            <button
                                onClick={() => handleDeleteAttendee(index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => setShowAttendeeForm(!showAttendeeForm)}
            >
                Add Attendee
            </button>

            {showAttendeeForm && (
                <form onSubmit={handleAddAttendee}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Attendee name"
                        value={attendee.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Attendee email"
                        value={attendee.email}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add
                    </button>

                </form>
            )}
        </div>
    );
}

export default EventItem;