import mongoose from 'mongoose';
import { v4 } from 'uuid';


const ProductSchema = new mongoose.Schema({
  _id: { type: String, default: v4}, 
  nombre: { type: String, required: true , trim : true, minlength: 3, maxlength: 100},
  descripcion: { type: String, trim : true, minlength: 10, maxlength: 500 },
  medidas: { type: String, trim : true, minlength: 3, maxlength: 100 },
  materiales: { type: String, trim : true, minlength: 3, maxlength: 100 },
  acabados: { type: String, trim : true, minlength: 3, maxlength: 100 },
  precio: { type: Number, min : 0 , required: true },
  imagen: { type: String, trim : true, match: /^https?:\/\/.+/, },
  stock: { type: Number, min : 0 , default: 0 },
}, { timestamps: true, _id: false });

export const Product = mongoose.model('Products', ProductSchema);

 