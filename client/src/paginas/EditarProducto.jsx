import "../estilos/CrearProducto.css";
import FormularioProducto from "../componentes/FormularioProducto";
import { useParams } from "react-router-dom";

export default function EditarProducto() {
  const { id } = useParams();

  return (
    <div className="detalle-producto crear-producto">
      <div className="detalle-contenido">
        <h2>Editar Producto</h2>
        <FormularioProducto productoId={id} />
      </div>
    </div>
  );
}
