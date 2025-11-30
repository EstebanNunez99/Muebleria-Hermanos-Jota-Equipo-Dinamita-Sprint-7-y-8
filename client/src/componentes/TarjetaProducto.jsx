import '../estilos/tarjetaProducto.css';
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../config/api.js";

export default function TarjetaProducto({ producto, agregarAlCarrito }) {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="tarjeta">
      <h3>{producto.nombre}</h3>

      <img src={`${producto.imagen}`} alt={producto.nombre} />
      <div className="detalle-info">
        <p>{producto.materiales}</p>
        <p><strong>Precio: ${producto.precio}</strong></p>

        <div className="botones">
          {esAdmin ? (
            // Botones para administradores
            <>
              <NavLink to={`/admin/editar-producto/${producto.id}`} className="btn-editar">
                ✏️ Editar
              </NavLink>
            </>
          ) : (
            // Botones para clientes
            <>
              <NavLink to={`/producto/${producto.id}`} className="btn-ver-detalle">
                Ver detalle
              </NavLink>

              <button 
                onClick={() => agregarAlCarrito(producto)} 
                className="btn-agregar"
              >
                🛒 Agregar al carrito
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
