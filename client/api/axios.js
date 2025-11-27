import axios from axios

const baseURL = import.meta.env.VITE_API_URL

if ( !baseURL ){
    console.error( ' <o> VITE_API_URL no está definido' )
}

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000
})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token')
        
        if(token){
            config.headers['x-auth-token'] = token
        }

        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(

    (response) => response,

    (error) => {
        //limpiar y redirigir sino está autenticado
        if(error.response?.status === 401 ){
            
            localStorage.removeItem('token')

            //lo redirijimo solo si no estamos en /auth
            if(window.location.pathname !== '/auth') {
                window.location.href = '/auth'
            }
            return Promise.reject(error)
        }
    }

)

export default api