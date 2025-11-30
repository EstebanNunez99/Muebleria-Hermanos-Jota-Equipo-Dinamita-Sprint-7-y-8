import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../estilos/detalleProducto.css";
import { API_PRODUCTOS_URL, API_BASE_URL } from "../config/api.js";
import { useCartState } from "../context/CartContext.jsx";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [agregado, setAgregado] = useState(false);

  const { addToCart } = useCartState();

  useEffect(() => {
    if (!id) {
      setCargando(false);
      return;
    }
    
    fetch(`${API_PRODUCTOS_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || "Producto no encontrado");
          });
        }
        return res.json();
      })
      .then((data) => {
        // Transformar _id a id para consistencia en el frontend
        const productoTransformado = {
          ...data,
          id: data._id || data.id
        };
        setProducto(productoTransformado);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error.message);
        setCargando(false);
        setProducto(null);
      });
  }, [id]);

  if (cargando) return <p className="detalle-cargando">Cargando producto...</p>;
  if (!producto) return <p className="detalle-error">Producto no encontrado</p>;

  const manejarAgregar = () => {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const clavesExcluidas = ["id", "_id", "nombre", "imagen", "precio", "descripcion"];
  const detallesExtra = Object.entries(producto).filter(
    ([clave]) => !clavesExcluidas.includes(clave)
  );

  return (
    <section className="detalle-producto">
      <div className="detalle-imagen">
        <img src={`${producto.imagen}`} alt={producto.nombre} />
      </div>

      <div className="detalle-contenido">
        <h2>{producto.nombre}</h2>
        <p className="detalle-descripcion">{producto.descripcion}</p>
        <p className="detalle-precio"><strong>Precio:</strong> ${producto.precio}</p>

        <ul className="detalle-lista">
  {detallesExtra
    .filter(([clave]) => !["createdAt", "updatedAt", "__v"].includes(clave))
    .map(([clave, valor]) => (
      <li key={clave}>
        <strong>{clave.charAt(0).toUpperCase() + clave.slice(1)}:</strong> {valor}
      </li>
    ))}
</ul>

        {agregado && <p className="detalle-confirmacion">Producto agregado al carrito ✅</p>}

        <div className="detalle-botones">
          <button onClick={manejarAgregar}>🛒 Añadir al carrito</button>
          <NavLink to="/catalogo" className="btn-volver">← Volver al catálogo</NavLink>
        </div>
      </div>
    </section>
  );
}

export default DetalleProducto;