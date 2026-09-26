function EventList({ events, loading }) {

    // Loading state
    if (loading) {
        return <p>Loading events...</p>;
    }

    // No events state
    if (events.length === 0) {
        return <p>No events found.</p>;
    }

    // Render events
    return (
        <div >
            {events.map((event) => (
                <div key={event._id} className=" w-full border boredr-red-300 rounded-lg ">
                    <b>{event.title}</b>

                    <p>{event.description}</p>

                    <p>Category: {event.category}</p>

                    <p>Location: {event.location}</p>

                    <p>Date: {event.date}</p>

                    <p>
                        Attendees: {event.attendees.length}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default EventList;