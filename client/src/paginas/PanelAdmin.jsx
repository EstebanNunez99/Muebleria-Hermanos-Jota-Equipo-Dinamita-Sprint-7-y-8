import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../estilos/panelAdmin.css';

const PanelAdmin = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [seccionActiva, setSeccionActiva] = useState('menu');

  // Verificar que es admin
  if (!usuario || usuario.rol !== 'admin') {
    return (
      <div className="panel-container">
        <div className="error-acceso">
          <h2>❌ Acceso Denegado</h2>
          <p>Solo los administradores pueden acceder a esta página.</p>
          <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1> Panel de Administración</h1>
        <p>Bienvenido, {usuario.nombre}</p>
      </div>

      <div className="panel-content">
        
        {seccionActiva === 'menu' && (
          <div className="panel-menu">
            <h2>Opciones de Administración</h2>
            
            <div className="opciones-grid">
              {/* card productos */}
              <div className="opcion-card">
                <h3>Gestionar Productos</h3>
                <p>Gestiona el catálogo de productos</p>
                <div className="botones-opcion">
                  <button 
                    className="btn-accion verde"
                    onClick={() => navigate('/admin/crear-producto')}
                  >
                    ➕ Crear
                  </button>
                  <button 
                    className="btn-accion azul"
                    onClick={() => setSeccionActiva('productos')}
                  >
                    📋 Listar
                  </button>
                </div>
              </div>

              {/* card users */}
              <div className="opcion-card">
                <h3>Gestionar Usuarios</h3>
                <p>Gestiona los usuarios del sistema</p>
                <div className="botones-opcion">
                  <button 
                    className="btn-accion azul"
                    onClick={() => setSeccionActiva('usuarios')}
                  >
                    📋 Listar
                  </button>
                </div>
              </div>

              {/* card para pedidos */}
              <div className="opcion-card">
                <h3>Gestionar Pedidos</h3>
                <p>Visualiza todos los pedidos realizados y su estado</p>
                <div className="botones-opcion">
                  <button 
                    className="btn-accion azul"
                    onClick={() => setSeccionActiva('pedidos')}
                  >
                    📋 Ver Pedidos
                  </button>
                </div>
              </div>

              {/* card para estadistcas, ver si podemos implementar */}
              <div className="opcion-card">
                <h3>📊 Estadísticas</h3>
                <p>Visualiza datos y estadísticas generales</p>
                <div className="botones-opcion">
                  <button 
                    className="btn-accion naranja"
                    onClick={() => setSeccionActiva('estadisticas')}
                  >
                    Ver Estadisticas
                  </button>
                </div>
              </div>
            </div>

            <button className="btn-volver" onClick={() => navigate('/catalogo')}>
              ← Volver al Catálogo
            </button>
          </div>
        )}

        {/* seecion para gestions deproductos */}
        {seccionActiva === 'productos' && (
          <div className="panel-seccion">
            <button className="btn-atras" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2>📦 Gestión de Productos</h2>
            <p className="info-texto">
              Aquí podrás listar, editar y eliminar productos.
            </p>
            <div className="info-box">
              <p>Para editar o eliminar un producto, ve al catálogo y haz clic en el botón ✏️ Editar en la tarjeta del producto.</p>
              <button 
                className="btn-accion verde"
                onClick={() => navigate('/admin/crear-producto')}
              >
                ➕ Crear Nuevo Producto
              </button>
              <button 
                className="btn-accion azul"
                onClick={() => navigate('/catalogo')}
              >
                📋 Ir al Catálogo
              </button>
            </div>
          </div>
        )}

        {/* seccio para gestionar a los usuarios */}
        {seccionActiva === 'usuarios' && (
          <div className="panel-seccion">
            <button className="btn-atras" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2>👥 Gestión de Usuarios</h2>
            <p className="info-texto">
              Lista de todos los usuarios registrados en el sistema.
            </p>
            <div className="info-box">
              <p> working progress :)</p>
            </div>
          </div>
        )}

        {/* seccion de pedidos*/}
        {seccionActiva === 'pedidos' && (
          <div className="panel-seccion">
            <button className="btn-atras" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2>📦 Gestión de Pedidos</h2>
            <p className="info-texto">
              Visualiza todos los pedidos realizados por los clientes.
            </p>
            <div className="info-box">
              <p> gestionar pedidos proximamente</p>
            </div>
          </div>
        )}

        {/* seccion de estadisticas */}
        {seccionActiva === 'estadisticas' && (
          <div className="panel-seccion">
            <button className="btn-atras" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2>📊 Estadísticas</h2>
            <p className="info-texto">
              Historial de ventas
            </p>
            <div className="info-box">
              <p> Funcionalidad de estadísticas posiblemente disponible próximamente</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdmin;
