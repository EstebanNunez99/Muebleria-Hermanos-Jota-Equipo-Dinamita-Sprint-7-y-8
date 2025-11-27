import "../estilos/carrito.css";
import { API_BASE_URL } from "../config/api.js";

export default function Carrito({ productosCarrito, eliminarDelCarrito, visible, cerrar }) {
  const total = productosCarrito.reduce(
    (suma, producto) => suma + producto.precio,
    0
  );

  return (
    <div className={`carrito-panel ${visible ? "visible" : ""}`}>
      <button className="cerrar-carrito" onClick={cerrar}>×</button>
      <h2>🛒 Carrito de Compras</h2>

      {productosCarrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="lista-carrito">
            {productosCarrito.map((producto, indice) => (
              <li key={indice} className="item-carrito">
                <img src={`${producto.imagen}`} alt={producto.nombre} className="imagen-carrito" />
                <div className="info-carrito">
                  <strong>{producto.nombre}</strong>
                  <p>${producto.precio}</p>
                  <button className='eliminar' onClick={() => eliminarDelCarrito(indice)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className='total'>Total: ${total}</h3>
        </div>
      )}
    </div>
  );
}