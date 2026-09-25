import axios from 'axios';

const api = axios.create({
    baseURL:'https://online-event-management-system-back.vercel.app/api/events'
});

export default api;