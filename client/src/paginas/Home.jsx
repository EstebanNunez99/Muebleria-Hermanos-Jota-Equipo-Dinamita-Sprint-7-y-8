import "../estilos/home.css";
import useProductos from "../../api/productosApi";
import { API_BASE_URL } from "../config/api.js";


export function Home() {



 const { productos, loading, error } = useProductos();

 const collageProductos = productos.slice(0, 3);

  return (
    <div className="home">
      <section className="presentacion">
        <div className="presentacion-left">
          <h1>Calidez y nostalgia que envuelve</h1>
          <p className="descripcion">
            Creamos muebles únicos que combinan tradición, calidad y futuro.<br />
            Descubre piezas hechas a mano para transformar tus espacios.
          </p>
        </div>

        <div className="presentacion-right">
          <div className="collage">
  {collageProductos.length >= 3 && (
    <>
      <div className="collage-item grande">
        <img src={`${collageProductos[0].imagen}`} alt={collageProductos[0].nombre} />
      </div>
      <div className="collage-item vertical">
        <img src={`${collageProductos[1].imagen}`} alt={collageProductos[1].nombre} />
      </div>
      <div className="collage-item cuadrado">
        <img src={`${collageProductos[2].imagen}`} alt={collageProductos[2].nombre} />
      </div>
    </>
  )}
</div>

        </div>
      </section>

      <section className="productos-destacados">
        <div className="productos-titulo">
          <span>POPULAR</span>
          <h2>Productos Destacados</h2>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}

        <div id="productosGrid" className="productos-grid">
          {productos.slice(0, 4).map(producto => (
            <div key={producto.id} className="producto-card">
              <img src={`${producto.imagen}`} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}