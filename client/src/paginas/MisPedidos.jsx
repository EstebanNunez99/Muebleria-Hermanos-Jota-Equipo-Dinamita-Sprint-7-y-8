import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../hooks/useAuth";
import "../estilos/MisPedidos.css";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchPedidos();
  }, [isAuthenticated, navigate]);

  const fetchPedidos = async () => {
    try {
      setCargando(true);
      const res = await api.get("/pedidos/usuario/mis-pedidos");
      setPedidos(res.data);
      setError("");
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
      setError("Error al cargar tus pedidos. Intenta más tarde.");
    } finally {
      setCargando(false);
    }
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "badge-pendiente";
      case "COMPLETADO":
        return "badge-completado";
      case "CANCELADO":
        return "badge-cancelado";
      default:
        return "";
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "🟡";
      case "COMPLETADO":
        return "🟢";
      case "CANCELADO":
        return "🔴";
      default:
        return "";
    }
  };

  if (cargando) {
    return (
      <div className="mis-pedidos-container">
        <h1>Mis Pedidos</h1>
        <div className="loading">Cargando tus pedidos...</div>
      </div>
    );
  }

  return (
    <div className="mis-pedidos-container">
      <h1> Mis Pedidos</h1>

      {error && <div className="error-message">{error}</div>}

      {pedidos.length === 0 ? (
        <div className="sin-pedidos">
          <p>No tienes pedidos aún.</p>
          <button onClick={() => navigate("/catalogo")} className="btn-comprar">
            Ir al catálogo
          </button>
        </div>
      ) : (
        <div className="pedidos-grid">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="tarjeta-pedido">
              <div className="pedido-header">
                <h3>Pedido #{pedido._id.slice(-6).toUpperCase()}</h3>
                <span className={`estado-badge ${getEstadoBadgeClass(pedido.estado)}`}>
                  {getEstadoColor(pedido.estado)} {pedido.estado}
                </span>
              </div>

              <div className="pedido-info">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(pedido.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>Total:</strong> <span className="total-precio">${pedido.total.toFixed(2)}</span>
                </p>
              </div>

              <div className="productos-pedido">
                <h4>Productos ({pedido.prfuctos.length}):</h4>
                <ul>
                  {pedido.prfuctos.map((item, idx) => (
                    <li key={idx} className="item-pedido">
                      <div className="item-info">
                        <p className="producto-nombre">
                          {item.producto?.nombre || "Producto no disponible"}
                        </p>
                        <p className="item-detalles">
                          Cantidad: {item.cantidad} | Precio: $
                          {item.preciounitario?.toFixed(2) || "0.00"} | Subtotal: $
                          {item.subtotal?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pedido-footer">
                <p className="fecha-actualizacion">
                  Actualizado:{" "}
                  {new Date(pedido.updatedAt).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}