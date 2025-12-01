# Mueblería Hermanos Jota - E-Commerce Platform

Plataforma de comercio electrónico para Mueblería Hermanos Jota. Permite a clientes comprar muebles y a administradores gestionar el negocio.

## 🎓 Info del proyecto

**Proyecto:** Mueblería Hermanos Jota  
**Sprint:** 7 y 8  
**Equipo:** Dinamita  
**Institución:** ITBA  
**Año:** 2025
**Integrantes:**
- Martinez Federico
- Nuñez Esteban

## Inicio Rápido

```bash
# Clonar
git clone https://github.com/EstebanNunez99/Muebleria-Hermanos-Jota-Equipo-Dinamita-Sprint-7-y-8.git

cd Muebleria-Hermanos-Jota-Equipo-Dinamita-Sprint-7-y-8
```
### 1. Configurar las variables de entorno en modo desarrollo
Crear archivo `.env` en la carpeta `backend`:
```bash
MONGODB_URI=cadena_de_conexion_a_mongo
DB_NAME=DB-Muebleria-Hermanos-Jota
JWT_SECRET=TU__SECRETO
FRONTEND_URL=http://localhost:5173
```

Crear archivo `.env` en la carpeta `client`:
```bash
VITE_API_URL=http://localhost:3000/api
```
### 2. Levantar el Backend (Terminal 1)
```bash
cd backend
npm install
npm start  # Puerto 3000
```

### 2. Levantar el frontend (Terminal 2)
```bash
cd client
npm install
npm run dev  # Puerto 5173
```

Acceso: http://localhost:5173

## Características Principales - Usuarios

### �️ Catálogo
- Visualizar productos con detalles
- Buscar y filtrar
- Ver detalles de los productos

### 🛒 Compra
- Carrito dinámico
- Checkout seguro
- Confirmación inmediata

### 📋 Pedidos
- Historial de compras
- Ver estado de la compra

### 👥 Acceso
- Registro y login 


## Características Principales - Admin

### �️ Catálogo
- Visualizar productos con detalles para editarlos
- Buscar y filtrar

### 🛒 Compra
- No realizar compras

### 📋 Pedidos
- Consulta Historial de pedidos
- Cambia estado del pedido

### 👥 Gestión
- Gestión de usuarios, eliminar usuarios
- CRUD completo de productos

## 🛠️ Stack Tecnológico

**Frontend:** React 18 + Vite + React Router  
**Backend:** Node.js + Express.js  
**BD:** MongoDB  
**Auth:** JWT (JSON Web Tokens)  
**Seguridad:** bcryptjs, CORS, Middleware


## � Pantallas Principales

**Para Usuarios:**
- 🏠 Home - Inicio
- 📖 Catálogo - Productos
- 🛒 Carrito - Compras
- 💳 Checkout - Confirmación
- 📋 Mis Pedidos - Historial
- 👤 Perfil - Datos personales

**Para Admins:**
- 🎛️ Panel Admin - Control central
- 📦 Gestionar Productos
- 👥 Gestionar Usuarios
- 📊 Gestionar Pedidos
- 👤 Perfil - Datos personales
---

## 🏗️ Arquitectura del Proyecto - Mueblería Hermanos Jota

## Descripción General

El proyecto **Mueblería Hermanos Jota** utiliza una arquitectura **Cliente-Servidor (Client-Server)** con **separación de capas**, donde el frontend y el backend se comunican a través de una **API REST**.

## 📁 Estructura de Carpetas Detallada

### Backend

```
backend/
├── bin/
│   └── www                          # Punto de entrada
├── controllers/
│   ├── Users.js                     # Lógica: registro, login, perfil
│   ├── Products.js                  # Lógica: CRUD productos
│   └── Pedidos.js                   # Lógica: crear, obtener, actualizar pedidos
├── models/
│   ├── UserSchema.js                # Esquema: email, contraseña, rol
│   ├── ProductSchema.js             # Esquema: nombre, precio, stock
│   └── PedidosSchema.js             # Esquema: cliente, productos, total
├── routes/
│   ├── UsersRoute.js                # Endpoints: /api/auth/*
│   ├── ProductsRoute.js             # Endpoints: /api/productos/*
│   └── PedidosRoute.js              # Endpoints: /api/pedidos/*
├── middleware/
│   └── authMiddleware.js            # Validación JWT, verificación de rol
├── database/
│   └── db.js                        # Conexión a MongoDB
├── utils/
│   └── generateToken.js             # Generación de JWT
├── server.js                        # Configuración Express, CORS
└── package.json                     # Dependencias
```

### Frontend

```
client/
└── src/
    ├── componentes/
    │   ├── BarraNavegacion.jsx      # Header con navegación
    │   ├── TarjetaProducto.jsx      # Card de producto
    │   ├── FormularioProducto.jsx   # Formulario crear/editar
    │   ├── ProtectedRoute.jsx       # Rutas protegidas por auth
    │   └── PiePagina.jsx            # Footer
    ├── paginas/
    │   ├── Home.jsx                 # Página inicio
    │   ├── Catalogo.jsx             # Listado productos
    │   ├── DetalleProducto.jsx      # Vista individual producto
    │   ├── Carrito.jsx              # Panel carrito
    │   ├── ConfirmarPedido.jsx      # Checkout
    │   ├── PedidoConfirmado.jsx     # Confirmación post-compra
    │   ├── MisPedidos.jsx           # Historial usuario
    │   ├── PanelAdmin.jsx           # Dashboard admin
    │   ├── CrearProducto.jsx        # Crear producto (admin)
    │   ├── EditarProducto.jsx       # Editar producto (admin)
    │   ├── Login.jsx                # Formulario login
    │   ├── Registro.jsx             # Formulario registro
    │   ├── MiPerfil.jsx             # Perfil usuario
    │   └── FormularioContacto.jsx   # Contacto
    ├── context/
    │   ├── AuthContext.js           # Contexto autenticación
    │   ├── AuthProvider.jsx         # Proveedor autenticación
    │   └── CartContext.jsx          # Contexto carrito
    ├── hooks/
    │   └── useAuth.js               # Hook para acceder a contexto auth
    ├── api/
    │   ├── axios.js                 # Cliente axios configurado
    │   └── productosApi.jsx         # Funciones específicas API
    ├── config/
    │   └── api.js                   # URL base de la API
    ├── estilos/                     # CSS modular
    └── App.jsx                      # Componente raíz + Router
```


## 🔐 Seguridad

- ✅ JWT para autenticación
- ✅ Contraseñas encriptadas
- ✅ Middleware de protección
- ✅ Roles (admin/cliente)
- ✅ CORS configurado
- ✅ Variables de entorno .env



