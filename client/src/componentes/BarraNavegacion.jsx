import React, { useState } from "react";
import "../estilos/barraNavegacion.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCartState } from "../context/CartContext";
import { FaBars, FaTimes } from "react-icons/fa";

export function BarraNavegacion({ alternarVisibilidadCarrito }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, usuario } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cartState = useCartState();
  const items = Array.isArray(cartState?.items) ? cartState.items : [];
  const cantidadCarrito = items.reduce((total, item) => total + item.cantidad, 0);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const closeMenu = () => {
    setMenuAbierto(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <header className="barra">
      <div className="barra-logo" onClick={() => handleNavigate("/")}>
        <img src="/logo.svg" alt="Logo Hermanos Jota" />
      </div>

      <div className="barra-nombre">
        <h2>Mueblería Hermanos Jota</h2>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`barra-links ${menuAbierto ? "active" : ""}`}>
        {/* Mostrar Inicio y Contacto solo a clientes */}
        {!usuario || usuario.rol !== 'admin' ? (
          <>
            <a onClick={() => handleNavigate("/")}>Inicio</a>
            <a onClick={() => handleNavigate("/catalogo")}>Catálogo</a>
            <a onClick={() => handleNavigate("/contacto")}>Contacto</a>
          </>
        ) : (
          <>
            <a onClick={() => handleNavigate("/catalogo")}>Catálogo</a>
            <a onClick={() => handleNavigate("/admin/panel")}> Panel Admin</a>
          </>
        )}

        {isAuthenticated ? (
          <>
            <a onClick={() => handleNavigate("/mi-perfil")}>
              Mi perfil
            </a>
          </>
        ) : (
          <>
            <a onClick={() => handleNavigate("/login")}>Ingresar</a>
          </>
        )}

        {/* Mostrar carrito solo a clientes */}
        {!usuario || usuario.rol !== 'admin' ? (
          <a onClick={() => { alternarVisibilidadCarrito(); closeMenu(); }}>
            🛒 Mi Carrito ({cantidadCarrito})
          </a>
        ) : null}
      </nav>
    </header>
  );
}