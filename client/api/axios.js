import axios from 'axios'

// Obtener la URL base del API desde variables de entorno
// En Vercel: Se configura en Environment Variables
// En desarrollo: Se puede establecer en .env.local
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
console.log('🔧 API_BASE_URL configurada como:', API_BASE_URL);

const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config
})

instance.interceptors.response.use(
    response => {
        console.log('✅ Response OK:', response.status);
        return response;
    },
    error => {
        console.error('❌ Error:', error.response?.status, error.response?.statusText, error.config?.url);
        return Promise.reject(error);
    }
)

export default instance