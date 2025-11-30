import "../estilos/barraNavegacion.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useCartState } from "../context/CartContext";

export function BarraNavegacion({ alternarVisibilidadCarrito }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, usuario } = useAuth();

  const { items } = useCartState();
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
        <a onClick={() => navigate("/")}>Inicio</a>
        <a onClick={() => navigate("/catalogo")}>Catálogo</a>
        <a onClick={() => navigate("/contacto")}>Contacto</a>

        {isAuthenticated ? (
          <>
            <a style={{ fontWeight: "bold", cursor: "default" }}>
              Hola, {usuario?.nombre}
            </a>
            <a onClick={() => {
              logout();
            }}>Cerrar Sesión</a>
          </>
        ) : (
          <>
            <a onClick={() => navigate("/login")}>Ingresar</a>
            <a onClick={() => navigate("/registro")}>Registrarse</a>
          </>
        )}

        <a onClick={alternarVisibilidadCarrito}>
          🛒 Mi Carrito ({cantidadCarrito})
        </a>
      </nav>
    </header>
  );
}