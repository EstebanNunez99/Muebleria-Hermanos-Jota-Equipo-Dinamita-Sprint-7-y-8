import jwt from 'jsonwebtoken'

//middleware para validar el token JWT
export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token de autenticación, acceso denegado'
        })
    }

    try { 
        if (!process.env.JWT_SECRET) {
            console.error(' <o> JWT_SECRET no está configurada la varaible de entorno')
            return res.status(500).json({
                msg: 'Error de configuracion en el servidor'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded.usuario
        next()
    }catch (error) {
        console.error(' <o> Token no válido', error)
        res.status(401).json({
            msg: 'Token no válido, acceso denegado'
        })
    }
}

//middleware para verificar rol de admin
export const rolAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return  res.status(403).json({
            msg: 'Acceso denegado: se requieren privilegios de administrador'
        })
    }
    next()
}

