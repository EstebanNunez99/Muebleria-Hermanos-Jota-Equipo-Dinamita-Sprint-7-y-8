import express from 'express'
import { register, login, getProfile, updateProfile, updatePassword } from '../controllers/Users.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)
router.put('/change-password', authMiddleware, updatePassword)

export default router