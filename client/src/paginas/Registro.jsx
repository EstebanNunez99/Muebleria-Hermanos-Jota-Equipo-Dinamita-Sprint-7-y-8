import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom'; 
import '../estilos/auth.css'; 

const Registro = () => {
    const { signup, isAuthenticated, errors } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contrasenia: ''
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/catalogo');
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(formData); 
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Crear Cuenta</h2>
                
                {errors.map((error, i) => (
                    <div className="error-msg" key={i}>{error}</div>
                ))}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder="Nombre completo"
                            className="form-input"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Correo electrónico"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="contrasenia"
                            placeholder="Contraseña (min 6 caracteres)"
                            className="form-input"
                            value={formData.contrasenia}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">Registrarse</button>
                </form>

                <p className='auth-link'>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Registro;