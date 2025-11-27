import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization')
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' })
    }

    try {
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ msg: 'Formato de token no válido' })
        }

        const cifrado = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = cifrado.usuario
        next()

    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' })
    }
}