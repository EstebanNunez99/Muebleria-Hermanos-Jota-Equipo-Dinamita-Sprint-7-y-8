// Configuración de la API
// Usa variables de entorno para diferentes ambientes (desarrollo, producción)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_PRODUCTOS_URL = `${API_BASE_URL}/api/productos`;

// En desarrollo: http://localhost:3000
// En producción: https://tu-backend.onrender.com

export { API_BASE_URL, API_PRODUCTOS_URL };

