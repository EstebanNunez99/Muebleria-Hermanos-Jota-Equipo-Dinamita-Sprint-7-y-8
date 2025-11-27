import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_PRODUCTOS_URL } from "../config/api";

export default function FormularioProducto() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const subirImagenACloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "productosFront"); // nombre EXACTO del preset

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/de6ise4ho/image/upload", {
      method: "POST",
      body: data
    });

    const result = await res.json();
    if (!res.ok) {
      console.error("❌ Error Cloudinary:", result);
      alert(`Error Cloudinary: ${result.error?.message || "Error desconocido"}`);
      return null;
    }

    return result.secure_url;
  } catch (err) {
    console.error("❌ Error al subir imagen:", err);
    return null;
  }
};


  const onSubmit = async (data) => {
    try {
      const archivo = data.imagenFile[0];
      const imagenUrl = await subirImagenACloudinary(archivo);

      console.log("Datos recibidos:", data);
      console.log("Archivo:", data.imagenFile?.[0]);

      

      const res = await fetch(API_PRODUCTOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imagen: imagenUrl,
          precio: parseFloat(data.precio),
          stock: parseInt(data.stock || 0),
        }),
      });

      console.log("URL de imagen:", imagenUrl);

      if (res.ok) {
        alert("✅ Producto creado correctamente");
        reset();
        navigate("/catalogo");
      } else {
        const error = await res.json();
        alert(`❌ Error: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formulario-producto">
      <div className="campo-form">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ej: Mesa de roble"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
      </div>

      <div className="campo-form">
        <label>Descripción</label>
        <textarea
          placeholder="Descripción detallada del producto..."
          {...register("descripcion", {
            required: "La descripción es obligatoria",
            minLength: {
              value: 10,
              message: "Debe tener al menos 10 caracteres",
            },
          })}
        />
        {errors.descripcion && (
          <p className="error">{errors.descripcion.message}</p>
        )}
      </div>

      <div className="campo-form">
        <label>Medidas</label>
        <input
          type="text"
          placeholder="Ej: 100x50x40 cm"
          {...register("medidas", {
            required: "Las medidas son obligatorias",
          })}
        />
        {errors.medidas && <p className="error">{errors.medidas.message}</p>}
      </div>

      <div className="campo-form">
        <label>Materiales</label>
        <input
          type="text"
          placeholder="Ej: Madera, hierro"
          {...register("materiales", {
            required: "Los materiales son obligatorios",
          })}
        />
        {errors.materiales && (
          <p className="error">{errors.materiales.message}</p>
        )}
      </div>
      <div className="campo-form">
  <label>Acabados</label>
  <input
    type="text"
    placeholder="Ej: Barniz mate, laca brillante"
    {...register("acabados", {
      required: "Los acabados son obligatorios",
      minLength: {
        value: 3,
        message: "Debe tener al menos 3 caracteres",
      },
    })}
  />
  {errors.acabados && <p className="error">{errors.acabados.message}</p>}
</div>


      <div className="campo-form">
        <label>Precio</label>
        <input
          type="number"
          placeholder="Ej: 25000"
          {...register("precio", {
            required: "El precio es obligatorio",
            min: { value: 0, message: "Debe ser un número positivo" },
          })}
        />
        {errors.precio && <p className="error">{errors.precio.message}</p>}
      </div>

      <div className="campo-form">
        <label>Imagen (archivo)</label>
        <input
          type="file"
          accept="image/*"
          {...register("imagenFile", {
            required: "La imagen es obligatoria",
          })}
        />
        {errors.imagenFile && (
          <p className="error">{errors.imagenFile.message}</p>
        )}
      </div>

      <div className="campo-form">
        <label>Stock</label>
        <input
          type="number"
          placeholder="Ej: 10"
          {...register("stock", {
            min: { value: 0, message: "No puede ser negativo" },
          })}
        />
        {errors.stock && <p className="error">{errors.stock.message}</p>}
      </div>

      <div className="detalle-botones">
        <button type="submit">Crear Producto</button>
        <button
          type="button"
          className="btn-volver"
          onClick={() => navigate("/catalogo")}
        >
          Volver
        </button>
      </div>
    </form>
  );
}
