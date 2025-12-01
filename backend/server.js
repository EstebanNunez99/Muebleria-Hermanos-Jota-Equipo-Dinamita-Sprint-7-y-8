import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './database/db.js';
import { Product } from './models/ProductSchema.js';
import ProductRoutes from './routes/ProductsRoute.js'
import PedidosRoutes from './routes/PedidosRoute.js'
import UsersRoutes from './routes/UsersRoute.js'

dotenv.config();
const app = express();

// Configurar CORS para producción
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL || 'http://localhost:5173'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

//rutas
app.use('/api/productos', ProductRoutes)
app.use('/api/pedidos', PedidosRoutes)
app.use('/api/auth', UsersRoutes)

await connectDB();

// Rutas
app.get('/', (req, res) => {
  res.send('API de la Mueblería Hermanos Jota');
});

export default app;
