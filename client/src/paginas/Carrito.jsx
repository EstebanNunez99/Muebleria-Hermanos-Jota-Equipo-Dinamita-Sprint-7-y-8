import "../estilos/carrito.css";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useCartState } from "../context/CartContext.jsx";

export default function Carrito({
  visible,
  cerrar,
}) {
  const { items, removeFromCart } = useCartState();
  const navigate = useNavigate();


  const total = items.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );


  const finalizarCompra = () => {
    navigate("/carrito"); // ← ruta del checkout final
  };

  return (
    <div className={`carrito-panel ${visible ? "visible" : ""}`}>
      <button className="cerrar-carrito" onClick={cerrar}>×</button>
      <h2>🛒 Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="lista-carrito">
            {items.map((producto, indice) => (
              <li key={indice} className="item-carrito">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="imagen-carrito"
                />

                <div className="info-carrito">
                  <strong>{producto.nombre}</strong>

                  <p>${producto.precio}</p>

                  <p>Cantidad: {producto.cantidad}</p>

                  <button
                    className="eliminar"
                    onClick={() => removeFromCart(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="total">Total: ${total}</h3>

          <button className="btn-finalizar-compra" onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
}
