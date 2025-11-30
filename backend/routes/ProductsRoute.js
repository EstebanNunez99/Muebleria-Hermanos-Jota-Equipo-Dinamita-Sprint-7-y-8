import express from "express";
import { authMiddleware, rolAdmin } from "../middleware/authMiddleware.js";
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/Products.js";


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, rolAdmin, createProduct)
router.put('/:id', authMiddleware, rolAdmin, updateProductById);
router.delete('/:id', authMiddleware, rolAdmin, deleteProductById)

export default router