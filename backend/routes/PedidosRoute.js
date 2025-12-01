import express from "express";
import { authMiddleware, rolAdmin } from "../middleware/authMiddleware.js";
import { crearPedido, obtenerPedidos, obtenerMisPedidos, actualizarEstadoPedido, eliminarPedido } from "../controllers/Pedidos.js";

const router = express.Router();

// GET - Obtener pedidos (todos si admin, solo del usuario si cliente)
router.get('/', authMiddleware, obtenerPedidos);

// GET - Obtener mis pedidos (del usuario autenticado)
router.get('/usuario/mis-pedidos', authMiddleware, obtenerMisPedidos);

// POST - Crear un nuevo pedido
router.post('/', authMiddleware, crearPedido);

// PUT - Actualizar estado del pedido (admin)
router.put('/:id/estado', authMiddleware, rolAdmin, actualizarEstadoPedido);

// DELETE - Eliminar pedido (admin)
router.delete('/:id', authMiddleware, rolAdmin, eliminarPedido);

router.get("/test", authMiddleware, (req, res) => {
  res.json({ msg: "Middleware OK", user: req.user });
});

export default router;