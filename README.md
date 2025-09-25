# 💅 VALKYRIA NAIL STUDIO - PWA

## Descripción

Aplicación Web Progresiva (PWA) diseñada para la gestión completa de servicios de manicuría de **VALKYRIA NAIL STUDIO**. La aplicación permite administrar servicios, precios, categorías y más, con funcionalidad offline completa.

## ✨ Características Principales

### 🔐 Autenticación Segura
- Sistema de login con usuario y contraseña
- Sesiones persistentes con opción "Recordar sesión"
- Credenciales por defecto: `admin` / `valkyria2025`

### 📊 Dashboard Completo
- Estadísticas en tiempo real (total servicios, precio promedio, categorías, rango de precios)
- Vista de tarjetas elegante para cada servicio
- Indicadores visuales con iconos y colores distintivos

### 🛠️ Gestión de Servicios
- ✅ **Agregar** nuevos servicios con toda la información
- ✏️ **Editar** servicios existentes
- 🗑️ **Eliminar** servicios con confirmación
- 📝 **Categorización** automática (Manicure, Pedicure, Nail Art, Extensiones, Tratamientos, Otros)

### 🔍 Funciones de Búsqueda y Filtrado
- 🔎 Búsqueda por nombre o descripción
- 🏷️ Filtrado por categorías
- 📈 Ordenamiento múltiple (nombre, precio, categoría)
- 🎯 Resultados en tiempo real

### 💼 Características Profesionales
- 💾 **Exportación de datos** en formato JSON
- 🌙 **Modo oscuro/claro** intercambiable
- 📱 **Diseño responsivo** para todos los dispositivos
- 🔔 **Notificaciones toast** informativas

### 📱 Funcionalidad PWA
- 📲 **Instalable** como app nativa
- 🔒 **Funciona offline** completamente
- ⚡ **Carga rápida** con caché inteligente
- 🎨 **Iconos personalizados** para la app

## 🚀 Instalación y Configuración

### 1. Configuración Básica
1. Descarga todos los archivos en una carpeta
2. Abre `login.html` en tu navegador web
3. Usa las credenciales por defecto para acceder

### 2. Instalación como PWA
1. Abre la aplicación en Chrome/Edge/Safari
2. Busca el ícono de "Instalar" en la barra de direcciones
3. Haz clic en "Instalar" para agregar a tu dispositivo
4. La app aparecerá en tu escritorio/pantalla de inicio

### 3. Personalización
- **Cambiar credenciales**: Modifica las variables en `auth.js`
- **Personalizar colores**: Edita las variables CSS en `:root` en `styles.css`
- **Agregar categorías**: Modifica los selects en `index.html` y `app.js`

## 📁 Estructura de Archivos

```
valkyria-nail-studio/
├── index.html          # Página pública del negocio  
├── login.html          # Página de autenticación
├── admin.html          # Dashboard administrativo
├── styles.css          # Estilos CSS completos
├── app.js             # Lógica del panel administrativo
├── auth.js            # Sistema de autenticación
├── public.js          # Lógica de la página pública
├── manifest.json      # Configuración PWA
├── service-worker.js  # Funcionalidad offline
└── README.md          # Este archivo
```

## 🎯 Uso de la Aplicación

### Estructura de Páginas
- **`index.html`** - Página pública de tu negocio (sin login requerido)
- **`login.html`** - Acceso administrativo 
- **`admin.html`** - Panel de administración de servicios

### Para Clientes (Página Pública)
- Abre `index.html` directamente
- Ve todos los servicios disponibles
- Información completa del negocio
- Formulario de contacto
- Botón de WhatsApp flotante

### Para Administración (Acceso Privado)
1. **Usuario**: `admin`
2. **Contraseña**: `valkyria2025`
3. Marca "Recordar sesión" para no tener que volver a loguearse

### Gestión de Servicios

#### ➕ Agregar Servicio
1. Haz clic en "**Nuevo Servicio**"
2. Completa los campos requeridos:
   - **Nombre**: Nombre del servicio
   - **Categoría**: Selecciona la categoría apropiada
   - **Precio**: Precio en pesos colombianos
   - **Duración**: Tiempo estimado en minutos (opcional)
   - **Descripción**: Descripción detallada (opcional)
3. Haz clic en "**Guardar**"

#### ✏️ Editar Servicio
1. En la tarjeta del servicio, haz clic en "**Editar**"
2. Modifica los campos necesarios
3. Haz clic en "**Guardar**" para aplicar cambios

#### 🗑️ Eliminar Servicio
1. En la tarjeta del servicio, haz clic en "**Eliminar**"
2. Confirma la eliminación en el diálogo
3. El servicio será removido permanentemente

### Funciones Avanzadas

#### 🔍 Búsqueda y Filtros
- **Búsqueda**: Escribe en la caja de búsqueda para filtrar por nombre o descripción
- **Filtro por categoría**: Selecciona una categoría específica del dropdown
- **Ordenamiento**: Cambia el orden usando el selector de ordenamiento

#### 📊 Exportación de Datos
1. Haz clic en el botón "**Exportar**"
2. Se descargará un archivo JSON con todos tus servicios
3. El archivo incluye datos de servicios y estadísticas

#### 🌙 Cambio de Tema
- Haz clic en el ícono de luna/sol en la esquina superior derecha
- El tema se guardará automáticamente para futuras visitas

## 🔧 Características Técnicas

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con variables CSS y grid/flexbox
- **JavaScript ES6+**: Programación moderna con clases y módulos
- **LocalStorage**: Almacenamiento local de datos
- **Service Workers**: Funcionalidad offline
- **Web App Manifest**: Configuración PWA

### Compatibilidad
- ✅ **Chrome 80+**
- ✅ **Firefox 75+**
- ✅ **Safari 13+**
- ✅ **Edge 80+**
- ✅ **Dispositivos móviles** (iOS/Android)

### Almacenamiento de Datos
- **Autenticación**: `valkyria_auth` (localStorage)
- **Servicios**: `valkyria_services` (localStorage)
- **Tema**: `valkyria_theme` (localStorage)

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary: #d946ef;        /* Color principal */
    --secondary: #f97316;      /* Color secundario */
    --accent: #06b6d4;         /* Color de acento */
    /* ... más colores ... */
}
```

### Agregar Nuevas Categorías
1. Edita los `<select>` en `index.html`
2. Actualiza la función `getSampleServices()` en `app.js`
3. Añade los nuevos valores a los filtros

### Modificar Credenciales
En `auth.js`, cambia:

```javascript
this.defaultCredentials = {
    username: 'tu_usuario',
    password: 'tu_contraseña'
};
```

## 🛠️ Desarrollo y Mantenimiento

### Agregar Nuevas Funciones
1. **Backup automático**: Implementar sincronización con servicios en la nube
2. **Citas**: Sistema de agendamiento de citas
3. **Clientes**: Gestión de base de datos de clientes
4. **Reportes**: Generación de reportes de ingresos

### Debugging
- Abre las Herramientas de Desarrollador (F12)
- Revisa la consola para mensajes de error
- Verifica el Application tab para datos de localStorage

### Actualizaciones
- Modifica la versión en `manifest.json`
- Actualiza `CACHE_NAME` en `service-worker.js`
- Limpia la caché del navegador si es necesario

## 📋 Datos de Ejemplo

La aplicación viene con 5 servicios de ejemplo:

1. **Manicure Clásico** - $25,000 (45 min)
2. **Pedicure Spa** - $35,000 (60 min)
3. **Nail Art Básico** - $40,000 (75 min)
4. **Extensiones de Gel** - $65,000 (120 min)
5. **Tratamiento Fortalecedor** - $20,000 (30 min)

## 🆘 Soporte y Solución de Problemas

### Problemas Comunes

#### No puedo iniciar sesión
- Verifica las credenciales: `admin` / `valkyria2025`
- Limpia la caché del navegador
- Revisa la consola para errores

#### Los datos no se guardan
- Asegúrate de que localStorage esté habilitado
- Verifica que no estés en modo incógnito
- Revisa el espacio disponible en el navegador

#### La app no funciona offline
- Verifica que el service worker esté registrado
- Recarga la página con conexión a internet primero
- Revisa que todos los archivos estén cacheados

### Contacto de Soporte
Para soporte adicional o mejoras:
- Revisa la documentación técnica en los archivos JavaScript
- Utiliza las herramientas de desarrollador del navegador
- Mantén backups regulares de tus datos

---

**© 2025 VALKYRIA NAIL STUDIO** - Aplicación Web Progresiva para gestión profesional de servicios de manicuría.