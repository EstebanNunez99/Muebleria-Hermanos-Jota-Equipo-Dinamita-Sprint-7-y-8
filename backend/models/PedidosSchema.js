import mongoose from "mongoose";

const PedidosSchema = new mongoose.Schema(
  {
    cliente: { type: String, ref: "User", required: true },
    prfuctos: [
      {
        producto: { type: String, ref: "Products", required: true },
        cantidad: { type: Number, required: true, min: 1 },
        preciounitario: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 }
      }
    ],
    total: { type: Number, required: true },
    estado: { type: String, enum: ["PENDIENTE", "COMPLETADO", "CANCELADO"], default: "PENDIENTE" }
  },
  { timestamps: true }
);

const Pedidos = mongoose.model("Pedidos", PedidosSchema);

export default Pedidos;