import User from  '../models/UserSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//resgistro
export const register = async (req, res) => {
    const { nombre, email, contrasenia } = req.body

    if ( !nombre  || !email || !contrasenia){
        return res.status(400).json({
            msg:'Debe completar todos los campos'
        })
    }

    if ( contrasenia.length < 6 ){ 
        return res.status(400).json({ 
            msg: 'La contraseña debe tener más de 6 caracteres'
        })
    }

    try {
        const userEmail = await User.findOne({ email })

        if (userEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ingresado'
            })
        }
        
        const user = new User({ nombre, email, contrasenia })
        const salt = await bcrypt.genSalt(10)
        user.contrasenia = await bcrypt.hash(contrasenia, salt)
        await user.save()

        const payload = { usuario: {id: user.id, rol: user.rol}}

        if (!process.env.JWT_SECRET){
            console.error(' <o> JWT_SECRET no está configurada la varaible de entorno')//no tengo emojis pq uso linux :(
            return res.status(500).json({
                msg: 'Error de configuracion en el servidor'
            })
        }

        jwt.sign(
            payload, process.env.JWT_SECRET, { expiresIn: '1d'},
            (err, token)=>{
                if ( err ) {
                    console.error('<o> Error al generar el token', err)
                    return res.status(500).json({
                        msg: 'Error al generar el token de autenticación :('
                    })                
                }
                res.status(201).json( {token} )
            }
        )

    } catch ( error ) {
        console.error( ' <o> Error al registrar nuevo usuario: ', error.message)
        res.status(500).json({
            msg: 'Error en el servidor :('
        })
    }
}

//iniciar sesion
export const login = async(req, res) => {
    const { email, contrasenia} = req.body

    if (!email || !contrasenia) {
        return res.status(400).json({
            msg: 'Por favor ingrese un email y una contraseña válida'
        })
    }

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({
                msg: ' Credenciales invalidas :('
            })
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia)
        if (!isMatch){
            return res.status(400).json({
                msg: ' Credenciales invalidas :('
            })
        }
        if (!process.env.JWT_SECRET){
            console.error(' <o> JWT_SECRET no está configurada la varaible de entorno')
            return res.status(500).json({
                msg: 'Error de configuracion en el servidor :('
            })
        }

        const payload = {usuario: { id: user.id, rol: user.rol}}
        jwt.sign(
            payload, process.env.JWT_SECRET, { expiresIn: '1d'},
            (err, token)=>{
                if ( err ) {
                    console.error('<o> Error al generar el token', err)
                    return res.status(500).json({
                        msg: 'Error al generar el token de autenticación :('
                    })                
                }
                res.status(200).json( {token} )
            }
        )
    } catch (error){
        console.error('<o> Error en el Login: ', error.message)
        res.status(500).json({
            msg: 'Error en el servidor :('
        })
    }
}

export const getProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.usuario.id).select('-contrasenia')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: 'Error en el servidor'})
    }
}