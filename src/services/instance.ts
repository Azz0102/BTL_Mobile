import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sver-3ubf.onrender.com',
    headers: {
        'Content-Type': 'application/json', // Set the default content type for requests
    },
});

export default instance;
