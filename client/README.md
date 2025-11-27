# Frontend - Mueblería Hermanos Jota

Este es el frontend de la aplicación, construido con React y Vite.

## Configuración de Variables de Entorno

Para conectar el frontend con el backend, necesitas configurar la variable de entorno `VITE_API_BASE_URL`.

### Desarrollo Local

1. Crea un archivo `.env.local` en la carpeta `client/` con el siguiente contenido:

```
VITE_API_BASE_URL=http://localhost:3000
```

2. El archivo `.env.local` ya está en `.gitignore` y no se subirá a git.

### Producción (Vercel)

1. Ve al dashboard de Vercel de tu proyecto
2. Navega a Settings → Environment Variables
3. Agrega la variable:
   - **Nombre**: `VITE_API_BASE_URL`
   - **Valor**: La URL de tu backend desplegado (ej: `https://tu-backend.herokuapp.com` o `https://tu-backend.railway.app`)
4. Selecciona los ambientes donde aplicar (Production, Preview, Development)
5. Haz redeploy de tu aplicación

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Despliegue en Vercel

Este proyecto está configurado para desplegarse automáticamente en Vercel. Solo necesitas:

1. Conectar tu repositorio de GitHub/GitLab/Bitbucket a Vercel
2. Configurar la variable de entorno `VITE_API_BASE_URL` en el dashboard de Vercel
3. Vercel detectará automáticamente que es un proyecto Vite y usará la configuración en `vercel.json`

### Pasos para Desplegar

1. **Instala Vercel CLI** (opcional, para deployment manual):
   ```bash
   npm i -g vercel
   ```

2. **Despliega desde la CLI**:
   ```bash
   cd client
   vercel
   ```

3. **O conecta tu repositorio en vercel.com**:
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu proyecto
   - Selecciona la carpeta `client` como Root Directory
   - Agrega la variable de entorno `VITE_API_BASE_URL`
   - Haz clic en Deploy

## Estructura del Proyecto

- `/src` - Código fuente de la aplicación
- `/api` - Hooks y funciones para comunicación con la API
- `/src/config` - Configuración de la aplicación (API URLs)
- `/src/componentes` - Componentes reutilizables
- `/src/paginas` - Páginas de la aplicación
- `/src/estilos` - Estilos CSS

## Conexión con el Backend

El frontend se conecta al backend a través de la variable de entorno `VITE_API_BASE_URL`. Asegúrate de que:

- En desarrollo: el backend esté corriendo en `http://localhost:3000`
- En producción: la URL del backend esté correctamente configurada en Vercel
