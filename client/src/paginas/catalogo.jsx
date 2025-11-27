  import useProductos from "../../api/productosApi";
  import TarjetaProducto from "../componentes/TarjetaProducto";
  import "../estilos/catalogo.css";

  export default function Catalogo({ agregarAlCarrito }) {
    const {
      productosFiltrados,
      busqueda,
      setBusqueda,
      loading,
      error
    } = useProductos();

    return (
      <main className="catalogo-main">
        <h1 className="titulo-catalogo">Catálogo de productos</h1>

        <div className="catalogo-search">
          <div className="search">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}

        <section className="grid-productos">
          {productosFiltrados.map(producto => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
               agregarAlCarrito={() => agregarAlCarrito(producto)}

            />
          ))}
        </section>
      </main>
    );
  }