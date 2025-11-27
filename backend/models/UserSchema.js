import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: v4}, 
    nombre: { type: String, required: true, trim: true, minlength: 3, maxlength: 120},
    email: { type: String, required: true, unique: true, lowecase:true, trim:true},
    contrasenia: { type: String, required: true},
    telefono: { type: String, trim: true, default:''},
    fotoURL: { type: String, trim: true, default:''},
    rol: { type: String, enum: ['cliente', 'admin'], default:'cliente'}
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)
export default User