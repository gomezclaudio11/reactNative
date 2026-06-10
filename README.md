# Rate Repository App 🚀

Una aplicación móvil interactiva desarrollada con **React Native** y **Expo** como parte del plan de estudios avanzado de Full Stack Helsinki y prácticas de desarrollo ágil. La aplicación funciona como una plataforma para explorar, calificar y reseñar repositorios de código abierto de GitHub en tiempo real, conectándose a un servidor local mediante **GraphQL** y **Apollo Client**.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

### Frontend (Mobile App)
- **React Native** & **Expo Go** (SDK 54)
- **TypeScript** / JavaScript (ES6+)
- **Apollo Client** (Gestión de estado global y consultas GraphQL)
- **React Router Native** (Enrutamiento y navegación declarativa)
- **Formik** & **Yup** (Validación estricta de formularios de usuario)
- **use-debounce** (Optimización de búsquedas en tiempo real)
- **@react-native-picker/picker** (Componentes de selección nativa)

### Backend & Almacenamiento
- **GraphQL API** (Servidor provisto por la universidad)
- **AsyncStorage** (Persistencia local segura de tokens de autenticación JWT)

---

## ✨ Características Principales

- **Visualización de Repositorios:** Lista fluida con estadísticas clave (Stars, Forks, Review Count, Rating Average) formateadas de manera limpia (valores > 1000 abreviados con 'k').
- **Buscador con Debouncing:** Barra de búsqueda en tiempo real que optimiza el consumo de datos esperando 500ms tras la escritura antes de consultar al servidor.
- **Filtros Avanzados:** Ordenamiento dinámico de la lista principal por últimos repositorios, mejor calificados o menor calificación.
- **Autenticación Completa:** Formularios de Inicio de Sesión (*Sign In*) y Registro de Nuevos Usuarios (*Sign Up*) con manejo seguro de sesiones mediante tokens almacenados localmente.
- **Ecosistema de Reseñas:**
  - Creación de opiniones vinculadas a repositorios reales de GitHub.
  - Vista exclusiva de "Mis Reseñas" (*My Reviews*) protegida por sesión.
  - Alertas de confirmación nativas para la eliminación de reseñas individuales con refresco dinámico de caché.
- **Scroll Infinito:** Paginación optimizada basada en cursores para las listas extensas de reseñas y repositorios utilizando las directivas de fusión de `InMemoryCache`.

---

## 📦 Instalación y Configuración

Sigue estos pasos para replicar el entorno de desarrollo local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/gomezclaudio11/reactNative.git](https://github.com/gomezclaudio11/reactNative.git)
cd reactNative/rate-repository-app
```

### 2. Instalar dependencias
Instala los módulos del frontend forzando las dependencias nativas requeridas para React 19 / Expo:
```bash
npm install --legacy-peer-deps
```

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz de la carpeta rate-repository-app para definir la URI de conexión de Apollo (reemplaza con tu IP local de la red Wi-Fi)

### 4. Levantar el servidor Backend (API)

Dirígete a la carpeta del servidor de desarrollo (asegúrate de haber solucionado el submódulo antes), instala sus dependencias e inicialízalo:
```bash
cd ../api
npm install
npm start
```

### 5. Iniciar la aplicación en Expo

Regresa a la carpeta de la aplicación móvil y arranca Metro Bundler:
```bash
cd ../rate-repository-app
npx expo start
```




