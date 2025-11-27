import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
 if (!MONGO_URI) {
   throw new Error('❌ La variable de entorno MONGODB_URI no está definida');
 }
 
 if (!DB_NAME) {
   throw new Error('❌ La variable de entorno DB_NAME no está definida');
 }

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
 
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};
