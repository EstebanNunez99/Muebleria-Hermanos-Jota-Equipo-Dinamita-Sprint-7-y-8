import express from 'express'
import { register, login, getProfile, updateProfile, updatePassword, getAllUsers, deleteUserById, updateUserById } from '../controllers/Users.js'
import { authMiddleware, rolAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)
router.put('/change-password', authMiddleware, updatePassword)

// Rutas para admin
router.get('/', authMiddleware, rolAdmin, getAllUsers)
router.delete('/:id', authMiddleware, rolAdmin, deleteUserById)
router.put('/:id', authMiddleware, rolAdmin, updateUserById)

export default router