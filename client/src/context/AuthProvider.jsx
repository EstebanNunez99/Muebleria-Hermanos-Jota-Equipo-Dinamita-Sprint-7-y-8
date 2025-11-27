import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import { AuthContext } from './AuthContext.js'

const AuthProvider = ({ children }) => {
    const [ usuario, setUsuario ] = useState(null)
    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [ errors, setErrors ] = useState([]) 
    const [ cargando, serCargando ] = useState(true)

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const logout = useCallback(()=>{
        localStorage.removeItem('token')
        setUsuario(null)
        setIsAuthenticated(false)
        setErrors([])
    }, [])

    useEffect (()=>{
        const verificarLogin = async () => {
            const token = localStorage.getItem('token')
            if ( !token ) {
                serCargando(false)
                return
            }

            try {
                const res = await api.get('/auth/profile') 
                setUsuario(res.data)
                setIsAuthenticated(true)
            } catch (error) {
                logout()
            } finally {
                serCargando(false)
            }
        }
        verificarLogin()
    }, [logout])

    
    const signup = async (user) => {
        try {
            const res = await api.post('/auth/register', user)
            localStorage.setItem('token', res.data.token)
            
            const perfilRes = await api.get('/auth/profile')
            setUsuario(perfilRes.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data);
            setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.msg || "Error al registrarse"])
        }
    }

    const signin = async (user) => {
        try {
            const res = await api.post('/auth/login', user)
            localStorage.setItem('token', res.data.token)
            
            const perfilRes = await api.get('/auth/profile')
            setUsuario(perfilRes.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data);
            setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.msg || "Error al iniciar sesión"])
        }
    }

    return (
        <AuthContext.Provider value = {{ 
            isAuthenticated, 
            usuario, 
            cargando, 
            signin,   
            signup,  
            logout,
            errors    
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider