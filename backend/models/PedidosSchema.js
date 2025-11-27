import mongoose from "mongoose";

const PedidosSchema = new mongoose.Schema(
  {
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Clientes", required: true },
    productos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Productos", required: true }
    ],
    total: { type: Number, required: true },
    estado: { type: String, enum: ["PENDIENTE", "COMPLETADO", "CANCELADO"], default: "PENDIENTE" }
  },
  { timestamps: true }
);

const Pedidos = mongoose.model("Pedidos", PedidosSchema);

export default Pedidos;