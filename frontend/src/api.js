import axios from 'axios';

const api = axios.create({
    baseURL:'https://online-event-management-system-backend.onrender.com/api/events'
})
export default api;