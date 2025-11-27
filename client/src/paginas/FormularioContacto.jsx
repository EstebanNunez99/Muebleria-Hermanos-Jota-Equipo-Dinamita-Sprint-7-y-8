import '../estilos/formularioContacto.css';
import { useState } from "react";

function FormularioContacto() {
  const [datos, actualizarDatos] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [enviado, actualizarEnviado] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    actualizarDatos({ ...datos, [name]: value });
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log("Datos enviados:", datos);
    actualizarEnviado(true);
  };

  return (
    <div className='formulario'>
      <h2>Contacto</h2>
      {enviado ? (
        <p>¡Gracias por contactarnos! Te responderemos pronto.</p>
      ) : (
        <form onSubmit={manejarEnvio}>
          <div>
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={manejarCambio}
              required
            />
          </div>
          <div>
            <label>Correo electronico:</label>
            <br />
            <input
              type="email"
              name="correo"
              value={datos.correo}
              onChange={manejarCambio}
              required
            />
          </div>
          <div>
            <label >Mensaje:</label>
            <br />
            <textarea
              name="mensaje"
              value={datos.mensaje}
              onChange={manejarCambio}
              required
            ></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}
export default FormularioContacto;
