# Proyecto TodoApp

TodoApp es una aplicación web de gestión de tareas (To-Do List) desarrollada con una arquitectura de frontend y backend separadas.

## Estructura del Proyecto

- **Backend/**: API REST construida con Node.js, Express y MySQL. Gestiona usuarios, autenticación y operaciones CRUD sobre tareas.
  - `src/`: Código fuente en TypeScript.
    - `controllers/`: Lógica de negocio para usuarios y tareas.
    - `models/`: Conexión y modelos de base de datos.
    - `routers/`: Definición de rutas y validaciones.
    - `config.ts`: Configuración general y tipos.
    - `server.ts`: Punto de entrada del servidor.
  - `.env`: Variables de entorno.
  - `build/`: Archivos compilados.
  - `package.json`: Dependencias y scripts.

- **Frontend/**: Interfaz de usuario desarrollada con React y Vite.
  - `src/`: Componentes y estilos de la aplicación.
  - `index.html`: Archivo principal.
  - `package.json`: Dependencias y scripts.

- **web/**: Archivos de pruebas de peticiones HTTP.

## Funcionalidades

- Registro y autenticación de usuarios.
- Gestión de tareas personales: crear, leer, actualizar y eliminar.
- Protección de rutas mediante JWT.
- Validación de datos con Zod.
- Interfaz moderna y responsiva.

## Instalación

1. Clona el repositorio.
2. Configura las variables de entorno en el backend.
3. Instala dependencias en ambos proyectos (`Backend` y `Frontend`).
4. Inicia el backend y el frontend.

---

¡Contribuciones y sugerencias son bienvenidas!