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
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="bg-blue-600 text-white py-8 shadow-lg">
                <h1 className="text-4xl font-bold text-center">
                    Online Event Management System
                </h1>

                <p className="text-center mt-2 text-blue-100">
                   
                </p>
            </div>


            {/* Main Container */}
            <div className="max-w-6xl mx-auto px-6 py-8">


                {/* Create Event */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        Create Event
                    </h2>

                    <EventForm onEventCreated={fetchEvents} />

                </div>


                {/* Search and Sort */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        Search & Sort Events
                    </h2>


                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search events by title"
                            value={filters.search}
                            onChange={(e) =>
                                handleSearch(e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3
                            text-gray-700 outline-none
                            focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500"
                        />


                        {/* Category */}
                        <select
                            value={filters.category}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3
                            bg-white text-gray-700 outline-none
                            focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Conference">Conference</option>
                            <option value="Music">Music</option>
                            <option value="Sports">Sports</option>
                        </select>


                        {/* Sort */}
                        <select
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3
                            bg-white text-gray-700 outline-none
                            focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="asc">
                                Date: Oldest First
                            </option>

                            <option value="desc">
                                Date: Newest First
                            </option>
                        </select>

                    </div>

                </div>


                {/* Event List */}
                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Events
                    </h2>

                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-500">
                                Loading events...
                            </p>
                        </div>
                    ) : (
                        <EventList
                            events={sortedEvents}
                            loading={loading}
                            onEventUpdated={fetchEvents}
                        />
                    )}

                </div>

            </div>

        </div>
    );
}

export default App;