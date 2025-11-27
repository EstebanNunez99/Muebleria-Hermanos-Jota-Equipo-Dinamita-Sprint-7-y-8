import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/auth.css';

const Login = () => {
    const { signin, isAuthenticated, errors } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        contrasenia: ''
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/catalogo');
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(formData);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Iniciar Sesión</h2>

                {errors.map((error, i) => (
                    <div className="error-msg" key={i}>{error}</div>
                ))}

                <form onSubmit={handleSubmit}>
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
                            placeholder="Contraseña"
                            className="form-input"
                            value={formData.contrasenia}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">Entrar</button>
                </form>

                <p className='auth-link'>
                    ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;