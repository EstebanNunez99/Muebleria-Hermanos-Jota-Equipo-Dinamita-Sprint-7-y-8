import "../estilos/barraNavegacion.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useCartState } from "../context/CartContext";

export function BarraNavegacion({ alternarVisibilidadCarrito }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, usuario } = useAuth();
  const esAdmin = usuario?.rol === 'admin';

  const cartState = useCartState();
  const items = Array.isArray(cartState?.items) ? cartState.items : [];
  const cantidadCarrito = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <header className="barra">
      <div className="barra-logo" onClick={() => navigate("/")}>
        <img src="/logo.svg" alt="Logo Hermanos Jota" />
      </div>

      <div className="barra-nombre">
        <h2>Mueblería Hermanos Jota</h2>
      </div>

      <nav className="barra-links">
        {/* Mostrar Inicio y Contacto solo a clientes */}
        {!usuario || usuario.rol !== 'admin' ? (
          <>
            <a onClick={() => navigate("/")}>Inicio</a>
            <a onClick={() => navigate("/catalogo")}>Catálogo</a>
            <a onClick={() => navigate("/contacto")}>Contacto</a>
          </>
        ) : (
          <>
            <a onClick={() => navigate("/catalogo")}>Catálogo</a>
            <a onClick={() => navigate("/admin/panel")}> Panel Admin</a>
          </>
        )}

        {isAuthenticated ? (
          <>
            <a onClick={()=> navigate("/mi-perfil")}>
              Mi perfil
            </a>
          </>
        ) : (
          <>
            <a onClick={() => navigate("/login")}>Ingresar</a>
          </>
        )}

        {/* Mostrar carrito solo a clientes */}
        {!usuario || usuario.rol !== 'admin' ? (
          <a onClick={alternarVisibilidadCarrito}>
            🛒 Mi Carrito ({cantidadCarrito})
          </a>
        ) : null}
      </nav>
    </header>
  );
}