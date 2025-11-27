import '../estilos/tarjetaProducto.css';
import { NavLink } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";

export default function TarjetaProducto({ producto, agregarAlCarrito }) {

  return (
    <div className="tarjeta">
      <h3>{producto.nombre}</h3>

      <img src={`${producto.imagen}`} alt={producto.nombre} />
      <div className="detalle-info">
        <p>{producto.materiales}</p>
        <p><strong>Precio: ${producto.precio}</strong></p>

        <div className="botones">

          <NavLink to={`/producto/${producto.id}`} className="btn-ver-detalle">
            Ver detalle
          </NavLink>

          <button 
            onClick={() => agregarAlCarrito(producto)} 
            className="btn-agregar"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
