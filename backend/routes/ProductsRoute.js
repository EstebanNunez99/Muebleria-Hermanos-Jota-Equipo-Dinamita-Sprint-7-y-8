import express from "express";
import { auth, rolAdmin } from "../middleware/auth.js";
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/Products.js";


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', auth, rolAdmin, createProduct)
router.put('/:id', auth, rolAdmin, updateProductById);
router.delete('/:id', auth, rolAdmin, deleteProductById)

export default router