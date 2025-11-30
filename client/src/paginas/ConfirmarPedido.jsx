import "../estilos/ConfirmarPedido.css";
import { useCartState } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function ConfirmarPedido() {
  const { items, clearCart } = useCartState();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const finalizarPedido = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return navigate("/login");
      }

      const productos = items.map((item) => item.id);

      const res = await fetch(`${API_BASE_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productos, total }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Error al crear el pedido");
        return;
      }

      clearCart(); // 🔥 Limpia el carrito
      navigate("/pedido-confirmado"); // 🔥 Redirige
    } catch (error) {
      console.error("Error al finalizar pedido:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Confirmación del Pedido</h1>

      <div className="checkout-layout">

        {/* IZQUIERDA */}
        <div className="checkout-left">
          {items.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.imagen} alt={item.nombre} className="checkout-img" />

              <div className="checkout-info">
                <h3>{item.nombre}</h3>

                <p className="precio-final">Precio: ${item.precio}</p>
                <p className="precio-sub">
                  Subtotal: ${item.precio * item.cantidad}
                </p>

                <div className="cantidad-box">
                  <span>Cantidad: <strong>{item.cantidad}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DERECHA */}
        <div className="checkout-right">
          <h2>RESUMEN</h2>
          <p>{items.length} productos</p>

          <div className="precio-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>

          <button className="btn-comprar" onClick={finalizarPedido}>
            Finalizar pedido
          </button>

          <button
            className="btn-volver"
            onClick={() => navigate("/carrito")}
          >
            Volver al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
