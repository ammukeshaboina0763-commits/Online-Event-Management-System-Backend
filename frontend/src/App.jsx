import { useEffect, useState } from 'react';
import api from './api';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {

    const [events, setEvents] = useState([]);

    const [filters, setFilters] = useState({
        search: '',
        category: ''
    });

    const [loading, setLoading] = useState(false);

    const [sortOrder, setSortOrder] = useState('asc');


    const fetchEvents = async () => {
        try {
            setLoading(true);

            const response = await api.get('/', {
                params: {
                    search: filters.search,
                    category: filters.category
                }
            });

            setEvents(response.data);

        } catch (error) {
            console.log('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchEvents();
    }, [filters]);


    const handleSearch = (value) => {
        setFilters({
            ...filters,
            search: value
        });
    };


    const handleCategoryChange = (value) => {
        setFilters({
            ...filters,
            category: value
        });
    };


    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return sortOrder === 'asc'
            ? dateA - dateB
            : dateB - dateA;
    });


    return (
        <div>
            <h1>Online Event Management System</h1>

            <EventForm onEventCreated={fetchEvents} />

            {/* Search */}
            <input
                type="text"
                placeholder="Search events by title"
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Sort */}
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="asc">Date: Oldest First</option>
                <option value="desc">Date: Newest First</option>
            </select>

            <EventList
                events={sortedEvents}
                loading={loading}
                onEventUpdated={fetchEvents}
            />
        </div>
    );
}

export default App;