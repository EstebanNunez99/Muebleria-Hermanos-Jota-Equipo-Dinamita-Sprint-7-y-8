import "../estilos/PedidoConfirmado.css";
import { useNavigate } from "react-router-dom";

export default function PedidoConfirmado() {
  const navigate = useNavigate();

  return (
    <div className="pedido-ok-container">
      <div className="pedido-ok-card">

        {/* ✔ Ícono */}
        <div className="pedido-ok-icon">✔</div>

        {/* Texto */}
        <h1 className="pedido-ok-title">¡Pedido Confirmado!</h1>
        <p className="pedido-ok-text">
          Tu pedido fue creado con éxito. Nos pondremos en contacto si es necesario.
        </p>

        {/* Botones */}
        <div className="pedido-ok-buttons">
          <button
            className="btn-volver-catalogo"
            onClick={() => navigate("/catalogo")}
          >
            Volver al catálogo
          </button>

          <button
            className="btn-mis-pedidos"
            onClick={() => navigate("/mis-pedidos")}
          >
            Ver mis pedidos
          </button>
        </div>
      </div>
    </div>
  );
}
