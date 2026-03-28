import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
        config.headers["x-api-key"] = apiKey;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("API Key is invalid or missing");
        }
        return Promise.reject(error);
    }
);
