import "../estilos/CrearProducto.css";
import FormularioProducto from "../componentes/FormularioProducto";


export default function CrearProducto () {
  return (
    <div className="detalle-producto crear-producto">
    

      <div className="detalle-contenido">
        <h2>Crear nuevo producto</h2>
        <FormularioProducto />
      </div>
    </div>
  );
};


