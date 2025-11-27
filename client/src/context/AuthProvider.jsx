import React, { useState, useEffect, useCallback, Children } from 'react'
import api from '../../api/axios'
import AuthContext from './AuthContext.js'

const AuthProvider = ({ Children }) => {
    const [ usuario, setUsuario ] = useState(null)
    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [ cargando, serCargando ] = useState(true)

    const logout = useCallback(()=>{
        localStorage.removeItem('token')
        setUsuario(null)
        setIsAuthenticated(false)
    }, [])

    useEffect (()=>{
        const token = localStorage.getItem('token')

        if ( token ) {
            api.get('/users/profile')
                .then(res => {
                    setUsuario(res.data)
                    setIsAuthenticated(true)
                })
                .catch(()=> logout())
                .finally(()=> serCargando(false))
        } else {
            serCargando(false)
        }
    }, [logout])

    const registro =async (nombre, email, contrasenia)=>{

        const res = await api.post('/users/login', { nombre, email, contrasenia})
        localStorage.setItem('token', res.data.token)
        
        const perfilRes = await api.get('/users/profile')
        setUsuario(perfilRes.data)

        setIsAuthenticated(true)
    }

    const login =async (email, contrasenia)=>{
        const res = await api.post('/users/login', { email, contrasenia})
        localStorage.setItem('token', res.data.token)
        
        const perfilRes = await api.get('/users/profile')
        setUsuario(perfilRes.data)

        setIsAuthenticated(true)
    }

    const updateUserContext = (newUserData) => {
        setUsuario(prevUsuario => ({ ...prevUsuario, ...newUserData}))
    }

    return (
        <AuthContext.Provider value = {{ isAuthenticated, usuario, cargando, login, registro, logout, updateUserContext}}>
            {!cargando && Children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

