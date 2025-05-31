# TodoApp - Aplicación Full Stack de Gestión de Tareas

## Descripción

TodoApp es una aplicación web full stack para gestionar tareas personales y profesionales. Permite crear, leer, actualizar y eliminar tareas con autenticación segura y una interfaz moderna y responsiva. Está desarrollada con TypeScript en backend y frontend para garantizar calidad y escalabilidad.

---

## Tecnologías

- **Backend:** Node.js, Express, TypeScript  
- **Frontend:** React, Vite, TypeScript  
- **Base de Datos:** MySQL  
- **Otros:** JWT para autenticación, dotenv para variables de entorno

---

## Características

- Registro y login de usuarios con manejo seguro de sesiones (JWT)  
- CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)  
- Interfaz intuitiva y rápida gracias a React + Vite  
- Validaciones en backend y frontend para asegurar datos correctos  
- Código modular, escalable y mantenible

---

## Instalación

### Requisitos

- Node.js v18+  
- MySQL  
- npm o yarn

### Pasos

1. Clonar el repositorio  
```bash
git clone https://github.com/UsopKing7/todoapp.git
cd todoapp
```

2. acceder a los directorios
```bash
cd Backend
cd Frontend
```

3. instalar dependencias
```bash
npm i // esto tanto en el frontend y backend 
```

4. iniciar servidor en Frontend
```bash
npm run dev 
```

5. iniciar servidor de backend
```bash
npm run tsc && npm run dev
```

6. Crear la base de datos /Backend/src/models/db.sql

7. interactuar con la pagina 
```bash
http://localhost:5173
```

# Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
  ```bash
  git checkout -b nombre-de-tu-rama
  ```
3. Realiza tus cambios y haz un commit:
  ```bash
  git commit -m "Descripción de los cambios"
  ```
4. Envía tus cambios al repositorio remoto:
  ```bash
  git push origin nombre-de-tu-rama
  ```
5. Crea un pull request.

## Soporte

Si tienes problemas al utilizar este script o tienes preguntas, no dudes en abrir un **issue** en el repositorio. Nos esforzamos por responder lo antes posible y ayudar a resolver cualquier inconveniente.

## Agradecimientos

Gracias por utilizar este proyecto. Si lo encuentras útil, ¡no dudes en dejar una estrella ⭐ en GitHub!