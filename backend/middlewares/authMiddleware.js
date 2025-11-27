import jsw from 'jsonwebtoken'

export const authMiddleware = (req, res, next) =>{
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({ msg: 'No se encontró el token'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = cifrado.usuario
        next()
    } catch ( error ) {
        res.status(401).json({msg: 'Token no valido'})
    }
    
}