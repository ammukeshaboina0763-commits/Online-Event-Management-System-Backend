import { useState } from 'react';

function AttendeeForm({ onAddAttendee }) {

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }

        if (!formData.email.trim()) {
            setError('Email is required');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Enter a valid email');
            return;
        }

        onAddAttendee(formData);

        setFormData({
            name: '',
            email: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Attendee name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Attendee email"
                value={formData.email}
                onChange={handleChange}
            />

            {error && <p>{error}</p>}

            <button type="submit">
                Add Attendee
            </button>

        </form>
    );
}

export default AttendeeForm;