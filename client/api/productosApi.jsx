import { useState, useEffect } from "react";
import { API_PRODUCTOS_URL } from "../src/config/api.js";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState(""); // 🔍 Estado para búsqueda

  // 🛠 Traer productos al montar la app
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch(API_PRODUCTOS_URL);
        if (!res.ok) throw new Error("Error en el fetch");
        const data = await res.json();
        // Transformar _id a id para consistencia en el frontend
        const productosTransformados = data.map(producto => ({
          ...producto,
          id: producto._id || producto.id
        }));
        setProductos(productosTransformados);
        console.log("Productos cargados:", productosTransformados);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  // 🔍 Filtrar productos según búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    productos,
    productosFiltrados,
    busqueda,
    setBusqueda,
    loading,
    error
  };
}