import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./componentes/ProtectedRoute.jsx";


import { BarraNavegacion } from "./componentes/BarraNavegacion.jsx";
import { Home } from "./paginas/Home.jsx";
import FinalizarCompra from "./paginas/FinalizarCompra.jsx";
import Catalogo from "./paginas/catalogo.jsx";
import FormularioContacto from "./paginas/FormularioContacto.jsx";
import Carrito from "./paginas/Carrito.jsx";
import DetalleProducto from "./paginas/DetalleProducto.jsx";
import PiePagina from "./componentes/PiePagina.jsx";
import CrearProducto from "./paginas/CrearProducto.jsx";
import EditarProducto from "./paginas/EditarProducto.jsx";
import PanelAdmin from "./paginas/PanelAdmin.jsx";
import Login from "./paginas/Login.jsx";
import Registro from "./paginas/Registro.jsx";
import ConfirmarPedido from "./paginas/ConfirmarPedido.jsx";
import PedidoConfirmado from "./paginas/PedidoConfirmado.jsx";
import MisPedidos from "./paginas/MisPedidos.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import MiPerfil from "./paginas/MiPerfil.jsx"

import "./index.css";

export function App() {
  const [carrito, actualizarCarrito] = useState([]);
  const agregarAlCarrito = (producto) => {
    actualizarCarrito([...carrito, producto]);
  };

  const [carritoVisible, setCarritoVisible] = useState(false);

  const alternarVisibilidadCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };
  const eliminarDelCarrito = (indice) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(indice, 1);
    actualizarCarrito(nuevoCarrito);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <BarraNavegacion cantidadCarrito={carrito.length} alternarVisibilidadCarrito={alternarVisibilidadCarrito} />

          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/catalogo" element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/contacto" element={<FormularioContacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />


            <Route path="/carrito" element={<ProtectedRoute>  <FinalizarCompra /> </ProtectedRoute>} />
            <Route path="/confirmar-pedido" element={<ProtectedRoute>  <ConfirmarPedido /> </ProtectedRoute>} />
            <Route path="/pedido-confirmado" element={<ProtectedRoute>  <PedidoConfirmado /> </ProtectedRoute>} />

            <Route path="/mi-perfil" element={<ProtectedRoute>  <MiPerfil /> </ProtectedRoute>} />

            <Route path="/admin/panel" element={<ProtectedRoute>  <PanelAdmin /> </ProtectedRoute>} />
            <Route path="/admin/crear-producto" element={<ProtectedRoute>  <CrearProducto /> </ProtectedRoute>} />
            <Route path="/admin/editar-producto/:id" element={<ProtectedRoute>  <EditarProducto /> </ProtectedRoute>} />
          </Routes>

          <Carrito
            productosCarrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            visible={carritoVisible}
            cerrar={() => setCarritoVisible(false)} />

          <PiePagina />
        </CartProvider>
        <div style={{ position: 'fixed', bottom: 10, right: 10, background: 'black', color: 'white', padding: 10, zIndex: 9999 }}>
          API: {import.meta.env.VITE_API_BASE_URL || 'UNDEFINED'}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 