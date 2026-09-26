import { useState } from 'react';
import api from '../api';

function EventForm({ onEventCreated }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/', formData);

            // Clear form
            setFormData({
                title: '',
                description: '',
                category: '',
                location: '',
                date: ''
            });

            // Refresh events list
            onEventCreated();

        } catch (error) {
            console.log('Error creating event:', error);
              if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Response:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="title"
                placeholder="Event title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Event description"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
            />

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Create Event
            </button>

        </form>
    );
}

export default EventForm;