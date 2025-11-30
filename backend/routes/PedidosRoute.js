import express from "express";
import { authMiddleware, rolAdmin } from "../middleware/authMiddleware.js";
import { crearPedido } from "../controllers/Pedidos.js";

const router = express.Router();

router.post('/', authMiddleware, crearPedido);

router.get("/test", authMiddleware, (req, res) => {
  res.json({ msg: "Middleware OK", user: req.user });
});

export default router;