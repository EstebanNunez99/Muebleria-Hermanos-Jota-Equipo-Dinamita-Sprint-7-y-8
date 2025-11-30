
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './database/db.js';
import { Product } from './models/ProductSchema.js';
import ProductRoutes from './routes/ProductsRoute.js'
import UsersRoutes from './routes/UsersRoute.js'
import PedidosRoutes from './routes/PedidosRoute.js'

dotenv.config();
const app = express();
app.use(cors());



app.use(express.json());


//rutas
app.use('/api/productos', ProductRoutes)

app.use('/api/auth', UsersRoutes)

app.use('/api/pedidos', PedidosRoutes)

await connectDB();
// Rutas
app.get('/', (req, res) => {
  res.send('API de la Mueblería Hermanos Jota');
});






export default app;

