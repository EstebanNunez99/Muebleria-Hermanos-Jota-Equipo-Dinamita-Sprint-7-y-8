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

export const updateProfile = async (req, res) => {
    try {
        const { nombre, email, telefono, fotoURL } = req.body
        const userId = req.usuario.id

        // Validaciones básicas
        if (nombre && nombre.length < 3) {
            return res.status(400).json({ msg: 'El nombre debe tener al menos 3 caracteres' })
        }

        // con esto voy a hacer el put
        const updateData = {}
        if (nombre) updateData.nombre = nombre
        if (email) updateData.email = email
        if (telefono) updateData.telefono = telefono
        if (fotoURL) updateData.fotoURL = fotoURL

        // Verificar si el email ya existe para cuando se intenta cambiar
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } })
            if (existingUser) {
                return res.status(400).json({ msg: 'El email ya está en uso' })
            }
        }

        const userUpdated = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-contrasenia')

        if (!userUpdated) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        res.json(userUpdated)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Error al actualizar el perfil' })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { contraseniaActual, contraseniaNueva, confirmarContrasenia } = req.body
        const userId = req.usuario.id

        if (!contraseniaActual || !contraseniaNueva || !confirmarContrasenia) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' })
        }

        if (contraseniaNueva.length < 6) {
            return res.status(400).json({ msg: 'La contraseña debe tener al menos 6 caracteres' })
        }

        if (contraseniaNueva !== confirmarContrasenia) {
            return res.status(400).json({ msg: 'Las contraseñas no coinciden' })
        }

        // buscamos el usuario
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        // controlo su contraseña actual
        const isMatch = await bcrypt.compare(contraseniaActual, user.contrasenia)
        if (!isMatch) {
            return res.status(400).json({ msg: 'La contraseña actual es incorrecta' })
        }

        // hash de nueva contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(contraseniaNueva, salt)

        // la actualizamo contraseña
        user.contrasenia = hashedPassword
        await user.save()

        res.json({ msg: 'Contraseña actualizada correctamente' })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Error al cambiar la contraseña' })
    }
}