# Instrucciones para Desplegar en Vercel

## Pasos Previos

1. **Asegúrate de que el backend esté desplegado** en algún servicio (Heroku, Railway, Render, etc.)
   - Anota la URL del backend (ej: `https://tu-backend.herokuapp.com`)

## Configuración en Vercel

### Opción 1: Desde el Dashboard Web (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. **Configuración del proyecto:**
   - **Framework Preset**: Vite
   - **Root Directory**: `client` (¡Importante! Debes especificar que la raíz es la carpeta client)
   - **Build Command**: `npm run build` (debería detectarse automáticamente)
   - **Output Directory**: `dist` (debería detectarse automáticamente)
   - **Install Command**: `npm install` (debería detectarse automáticamente)

5. **Variables de Entorno:**
   - Haz clic en "Environment Variables"
   - Agrega una nueva variable:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: La URL de tu backend desplegado (ej: `https://tu-backend.herokuapp.com`)
     - **Environments**: Selecciona Production, Preview y Development

6. Haz clic en "Deploy"

### Opción 2: Desde la CLI

1. **Instala Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión**:
   ```bash
   vercel login
   ```

3. **Navega a la carpeta client**:
   ```bash
   cd client
   ```

4. **Despliega**:
   ```bash
   vercel
   ```
   - Sigue las instrucciones interactivas
   - Cuando pregunte por el directorio raíz, selecciona `.` (el directorio actual, client)

5. **Configura la variable de entorno**:
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   - Ingresa la URL de tu backend
   - Selecciona los ambientes donde aplicar

6. **Redeploy** (para aplicar las variables de entorno):
   ```bash
   vercel --prod
   ```

## Verificación Post-Deployment

1. Una vez desplegado, visita la URL que Vercel te proporciona
2. Verifica que la aplicación carga correctamente
3. Abre la consola del navegador (F12) y verifica que:
   - No hay errores de CORS
   - Las peticiones a la API se están haciendo correctamente
   - Las imágenes se cargan correctamente

## Solución de Problemas

### Error: "Cannot find module"
- Asegúrate de que el Root Directory esté configurado como `client`

### Error: Las imágenes no cargan
- Verifica que `VITE_API_BASE_URL` esté correctamente configurada
- Asegúrate de que el backend esté sirviendo las imágenes correctamente

### Error: CORS
- El backend debe tener configurado CORS para permitir requests desde el dominio de Vercel
- Verifica que en el backend, la configuración de CORS incluya tu dominio de Vercel

### Error: Variables de entorno no funcionan
- Las variables de entorno en Vite deben empezar con `VITE_`
- Después de agregar variables, haz un redeploy completo

## Configuración Adicional (Opcional)

Si necesitas configuraciones especiales, edita `vercel.json` en la carpeta `client/`.

## Notas Importantes

- **Root Directory**: Es crucial que configures el Root Directory como `client` en Vercel, de lo contrario buscará los archivos en la raíz del monorepo
- **Variables de Entorno**: Siempre que cambies `VITE_API_BASE_URL`, necesitas hacer redeploy
- **Build Time**: Las variables de entorno de Vite se incrustan en el build, no son runtime

