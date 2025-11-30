import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../../api/axios';
import '../estilos/panelAdmin.css';

const PanelAdmin = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [seccionActiva, setSeccionActiva] = useState('menu');

  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  
  // const [pedidos, setPedidos] = useState([]);
  // const [cargandoPedidos, setCargandoPedidos] = useState(false);

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

  // para cargar productos
  const cargarProductos = async () => {
    try {
      setCargandoProductos(true);
      const res = await api.get('/productos');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setCargandoProductos(false);
    }
  };

  // para la carga de usuarios
  const cargarUsuarios = async () => {
    try {
      setCargandoUsuarios(true);
      const res = await api.get('/auth');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setCargandoUsuarios(false);
    }
  };

  // Cargar pedidos
  // const cargarPedidos = async () => {
  //   try {
  //     setCargandoPedidos(true);
  //     const res = await api.get('/pedidos');
  //     setPedidos(res.data);
  //   } catch (error) {
  //     console.error('Error al cargar pedidos:', error);
  //   } finally {
  //     setCargandoPedidos(false);
  //   }
  // };

  // Eliminar producto por id
  const eliminarProducto = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        cargarProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  // Eliminar usuario por di
  const eliminarUsuario = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      try {
        await api.delete(`/auth/${id}`);
        cargarUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  // Actualizar estado del pedido
  // const actualizarEstadoPedido = async (id, nuevoEstado) => {
  //   try {
  //     await api.put(`/pedidos/${id}/estado`, { estado: nuevoEstado });
  //     cargarPedidos();
  //   } catch (error) {
  //     console.error('Error al actualizar pedido:', error);
  //   }
  // };

  // Eliminar pedido
  // const eliminarPedido = async (id) => {
  //   if (window.confirm('¿Está seguro de que desea eliminar este pedido?')) {
  //     try {
  //       await api.delete(`/pedidos/${id}`);
  //       cargarPedidos();
  //     } catch (error) {
  //       console.error('Error al eliminar pedido:', error);
  //     }
  //   }
  // };

  useEffect(() => {
    if (seccionActiva === 'productos') {
      cargarProductos();
    } else if (seccionActiva === 'usuarios') {
      cargarUsuarios();
    }
    // } else if (seccionActiva === 'pedidos') {
    //   cargarPedidos();
    // }
  }, [seccionActiva]);

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
                <h3> Gestionar Productos</h3>
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
                <h3>👥 Gestionar Usuarios</h3>
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
                <h3> Gestionar Pedidos</h3>
                <p>Visualiza todos los pedidos realizados y su estado</p>
                <p> Todavia no funciona :) </p>
          
                <div className="botones-opcion">
                  <button 
                    className="btn-accion azul"
                    // onClick={() => setSeccionActiva('pedidos')}
                  >
                    📋 Ver Pedidos
                  </button>
                </div>
              </div>
            </div>

            <button className="btn-volver" onClick={() => navigate('/catalogo')}>
              ← Volver al Catálogo
            </button>
          </div>
        )}

        {/* seccion para gestions deproductos */}
        {seccionActiva === 'productos' && (
          <div className="panel-seccion">
            <button className="btn-volver" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2> Gestión de Productos</h2>
            
            <div className="btn-grupo">
              <button 
                className="btn-accion verde"
                onClick={() => navigate('/admin/crear-producto')}
              >
                ➕ Crear Nuevo Producto
              </button>
            </div>

            {cargandoProductos ? (
              <p>Cargando productos...</p>
            ) : productos.length === 0 ? (
              <p>No hay productos registrados.</p>
            ) : (
              <div className="tabla-responsiva">
                <table className="tabla-admin">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(producto => (
                      <tr key={producto._id}>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>{producto.stock || 0}</td>
                        <td className="acciones">
                          <button 
                            className="btn-editar"
                            onClick={() => navigate(`/admin/editar-producto/${producto._id}`)}
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            className="btn-eliminar"
                            onClick={() => eliminarProducto(producto._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* seccion para gestionar a los usuarios */}
        {seccionActiva === 'usuarios' && (
          <div className="panel-seccion">
            <button className="btn-volver" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2>👥 Gestión de Usuarios</h2>
            
            {cargandoUsuarios ? (
              <p>Cargando usuarios...</p>
            ) : usuarios.length === 0 ? (
              <p>No hay usuarios registrados.</p>
            ) : (
              <div className="tabla-responsiva">
                <table className="tabla-admin">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Teléfono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(usr => (
                      <tr key={usr._id}>
                        <td>{usr.nombre}</td>
                        <td>{usr.email}</td>
                        <td>
                          <span className={`rol-badge ${usr.rol}`}>
                            {usr.rol === 'admin' ? ' Admin' : '👤 Cliente'}
                          </span>
                        </td>
                        <td>{usr.telefono || '-'}</td>
                        <td className="acciones">
                          <button 
                            className="btn-eliminar"
                            onClick={() => eliminarUsuario(usr._id)}
                            disabled={usr._id === usuario._id}
                          >
                             Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* seccion de pedidos*/}
        {seccionActiva === 'pedidos' && (
          <div className="panel-seccion">
            <button className="btn-volver" onClick={() => setSeccionActiva('menu')}>
              ← Volver al menú
            </button>
            <h2> Gestión de Pedidos</h2>
            
            {cargandoPedidos ? (
              <p>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
              <p>No hay pedidos registrados.</p>
            ) : (
              <div className="tabla-responsiva">
                <table className="tabla-admin">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map(pedido => (
                      <tr key={pedido._id}>
                        <td>#{pedido._id.slice(-6).toUpperCase()}</td>
                        <td>{pedido.cliente?.nombre || '-'}</td>
                        <td>${pedido.total.toFixed(2)}</td>
                        <td>
                          <select 
                            className={`estado-select estado-${pedido.estado.toLowerCase()}`}
                            value={pedido.estado}
                            onChange={(e) => actualizarEstadoPedido(pedido._id, e.target.value)}
                          >
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="COMPLETADO">COMPLETADO</option>
                            <option value="CANCELADO">CANCELADO</option>
                          </select>
                        </td>
                        <td>{new Date(pedido.createdAt).toLocaleDateString()}</td>
                        <td className="acciones">
                          <button 
                            className="btn-eliminar"
                            onClick={() => eliminarPedido(pedido._id)}
                          >
                             Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdmin;
