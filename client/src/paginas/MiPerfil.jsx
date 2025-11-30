import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../../api/axios';
import '../estilos/miPerfil.css';

const MiPerfil = () => {
    const { usuario, logout, updateUserContext } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [tabActivo, setTabActivo] = useState('datos'); // pueden ser datos o cambiar su contraseña
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
    const [cargando, setCargando] = useState(false);

    // ues esto para edición de datos
    const [datosEdicion, setDatosEdicion] = useState({
        nombre: usuario?.nombre || '',
        email: usuario?.email || '',
        telefono: usuario?.telefono || ''
    });

    // este estado para cambio de contraseña
    const [datosContrasenia, setDatosContrasenia] = useState({
        contraseniaActual: '',
        contraseniaNueva: '',
        confirmarContrasenia: ''
    });

    if (!usuario) return <div className="perfil-container">Cargando...</div>;

    // la carga de la foto, arreglar o sacar directamnte
    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // comprobamos tipo de archivo
        if (!file.type.startsWith('image/')) {
            setMensaje({ tipo: 'error', texto: 'Por favor, selecciona una imagen válida.' });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
            return;
        }

        // que no pese mas de 5mb
        if (file.size > 5 * 1024 * 1024) {
            setMensaje({ tipo: 'error', texto: 'La imagen no debe superar los 5MB.' });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
            return;
        }

        setUploadingPhoto(true);
        
        try {
            // la convierto a base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64String = reader.result;
                    
                    const response = await api.put('/auth/profile', { 
                        fotoURL: base64String 
                    });
                    
                    updateUserContext(response.data);
                    setMensaje({ tipo: 'exito', texto: 'Foto de perfil actualizada correctamente' });
                    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                } catch (error) {
                    console.error('Error al actualizar foto:', error);
                    setMensaje({ tipo: 'error', texto: 'Error al actualizar la foto de perfil' });
                    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                } finally {
                    setUploadingPhoto(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error al procesar foto:', error);
            setMensaje({ tipo: 'error', texto: 'Error al procesar la imagen' });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
            setUploadingPhoto(false);
        }
    };

    //formulario de cambio de datso
    const handleDatosChange = (e) => {
        const { name, value } = e.target;
        setDatosEdicion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardarDatos = async () => {
        setCargando(true);
        try {
            
            if (datosEdicion.nombre.length < 3) {
                setMensaje({ tipo: 'error', texto: 'El nombre debe tener al menos 3 caracteres' });
                setCargando(false);
                setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                return;
            }

            const response = await api.put('/auth/profile', datosEdicion);
            updateUserContext(response.data);
            setMensaje({ tipo: 'exito', texto: 'Perfil actualizado correctamente' });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Error al actualizar el perfil';
            setMensaje({ tipo: 'error', texto: errorMsg });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelarEdicion = () => {
        setDatosEdicion({
            nombre: usuario?.nombre || '',
            email: usuario?.email || '',
            telefono: usuario?.telefono || ''
        });
        setMensaje({ tipo: '', texto: '' });
    };

    //form para cambio de contraseña
    const handleContraseniaChange = (e) => {
        const { name, value } = e.target;
        setDatosContrasenia(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCambiarContrasenia = async () => {
        setCargando(true);
        try {
            if (!datosContrasenia.contraseniaActual) {
                setMensaje({ tipo: 'error', texto: 'Ingresa tu contraseña actual' });
                setCargando(false);
                setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                return;
            }

            if (datosContrasenia.contraseniaNueva.length < 6) {
                setMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener al menos 6 caracteres' });
                setCargando(false);
                setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                return;
            }

            if (datosContrasenia.contraseniaNueva !== datosContrasenia.confirmarContrasenia) {
                setMensaje({ tipo: 'error', texto: 'Las contraseñas no coinciden' });
                setCargando(false);
                setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
                return;
            }

            await api.put('/auth/change-password', datosContrasenia);
            
            setMensaje({ tipo: 'exito', texto: 'Contraseña cambiada correctamente' });
            setDatosContrasenia({
                contraseniaActual: '',
                contraseniaNueva: '',
                confirmarContrasenia: ''
            });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Error al cambiar la contraseña';
            setMensaje({ tipo: 'error', texto: errorMsg });
            setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelarContrasenia = () => {
        setDatosContrasenia({
            contraseniaActual: '',
            contraseniaNueva: '',
            confirmarContrasenia: ''
        });
        setMensaje({ tipo: '', texto: '' });
    };

    // cerrar sesion
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <h2>Mi Perfil</h2>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>

            {mensaje.texto && (
                <div className={`mensaje-${mensaje.tipo}`}>
                    {mensaje.texto}
                </div>
            )}

            <div className="perfil-content">
                
                    <div className="perfil-datos">
                        <h3>Datos de la Cuenta</h3>
                        <div className="dato-item">
                            <span className="dato-label">Nombre:</span>
                            <span className="dato-valor">{usuario.nombre}</span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Email:</span>
                            <span className="dato-valor">{usuario.email}</span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Teléfono:</span>
                            <span className={`dato-valor ${!usuario.telefono ? 'no-especificado' : ''}`}>
                                {usuario.telefono || 'No especificado'}
                            </span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Rol:</span>
                            <span className="dato-valor">
                                {usuario.rol === 'admin' ? 'Administrador' : 'Cliente'}
                            </span>
                        </div>
                    

                    {/* FOTO DE PERFIL */}
                    
                </div>
                <div>
                    <div className="perfil-acciones">
                        <h3>Acciones</h3>
                        
                        {/* Solo para clientes */}
                        {usuario.rol === 'cliente' && (
                            <>
                                <button onClick={() => navigate('/mis-pedidos')}>
                                    Historial de Compras
                                </button>
                                <button onClick={() => navigate('/catalogo')}>
                                    Continuar Comprando
                                </button>
                            </>
                        )}

                        {/* Solo para admins */}
                        {usuario.rol === 'admin' && (
                            <>
                                <button onClick={() => navigate('/admin/crear-producto')}>
                                    Crear Producto
                                </button>
                                <button onClick={() => navigate('/admin/productos')}>
                                    Gestionar Productos
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="perfil-foto-container">
                        <h3>Foto de Perfil</h3>
                        <div className="foto-wrapper">
                            <img
                                className="foto-imagen"
                                src={usuario.fotoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(usuario.nombre) + '&size=200&background=random'}
                                alt="Foto de perfil"
                            />
                            {uploadingPhoto && (
                                <div className="foto-cargando">Cargando...</div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                        <button 
                            className="btn-cambiar-foto"
                            onClick={handlePhotoClick}
                            disabled={uploadingPhoto}
                        >
                            {uploadingPhoto ? 'Subiendo...' : 'Cambiar Foto'}
                        </button>
                    </div>

                
            <div className="perfil-edicion">
                <h3>Editar Perfil</h3>
                
                <div className="tab-botones">
                    <button 
                        className={`tab-btn ${tabActivo === 'datos' ? 'activo' : ''}`}
                        onClick={() => setTabActivo('datos')}
                    >
                        Información Personal
                    </button>
                    <button 
                        className={`tab-btn ${tabActivo === 'cambiarContrasenia' ? 'activo' : ''}`}
                        onClick={() => setTabActivo('cambiarContrasenia')}
                    >
                        Cambiar Contraseña
                    </button>
                </div>

                {tabActivo === 'datos' && (
                    <div>
                        <div className="form-grupo">
                            <label className="form-label">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-input"
                                value={datosEdicion.nombre}
                                onChange={handleDatosChange}
                            />
                            <span className="form-ayuda">Mínimo 3 caracteres</span>
                        </div>

                        <div className="form-grupo">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                value={datosEdicion.email}
                                onChange={handleDatosChange}
                            />
                        </div>

                        <div className="form-grupo">
                            <label className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                className="form-input"
                                placeholder="+54 11 XXXX-XXXX"
                                value={datosEdicion.telefono}
                                onChange={handleDatosChange}
                            />
                        </div>

                        <div className="acciones-botones">
                            <button 
                                className="btn-guardar"
                                onClick={handleGuardarDatos}
                                disabled={cargando}
                            >
                                {cargando ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                            <button 
                                className="btn-cancelar"
                                onClick={handleCancelarEdicion}
                                disabled={cargando}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {tabActivo === 'cambiarContrasenia' && (
                    <div>
                        <div className="form-grupo">
                            <label className="form-label">Contraseña Actual</label>
                            <input
                                type="password"
                                name="contraseniaActual"
                                className="form-input"
                                value={datosContrasenia.contraseniaActual}
                                onChange={handleContraseniaChange}
                            />
                        </div>

                        <div className="form-grupo">
                            <label className="form-label">Nueva Contraseña</label>
                            <input
                                type="password"
                                name="contraseniaNueva"
                                className="form-input"
                                value={datosContrasenia.contraseniaNueva}
                                onChange={handleContraseniaChange}
                            />
                            <span className="form-ayuda">Mínimo 6 caracteres</span>
                        </div>

                        <div className="form-grupo">
                            <label className="form-label">Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                name="confirmarContrasenia"
                                className="form-input"
                                value={datosContrasenia.confirmarContrasenia}
                                onChange={handleContraseniaChange}
                            />
                        </div>

                        <div className="acciones-botones">
                            <button 
                                className="btn-guardar"
                                onClick={handleCambiarContrasenia}
                                disabled={cargando}
                            >
                                {cargando ? 'Cambiando...' : 'Cambiar Contraseña'}
                            </button>
                            <button 
                                className="btn-cancelar"
                                onClick={handleCancelarContrasenia}
                                disabled={cargando}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
            </div>

            
        </div>
    );
};

export default MiPerfil;