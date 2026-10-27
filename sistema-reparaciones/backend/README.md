```markdown
# 🛠️ Sistema de Gestión de Clientes y Reparaciones (Backend API)

API RESTful desarrollada con estándares de la industria para la gestión integral de un taller de reparaciones, enfocada en la seguridad, la arquitectura modular y el tipado estricto.

---

## 🚀 Tecnologías y Herramientas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Lenguaje:** TypeScript
* **Base de Datos & ORM:** SQLite con Prisma ORM
* **Validación:** Zod (Validación perimetral de esquemas)
* **Seguridad:** JSON Web Tokens (JWT) & bcrypt (Hashing de contraseñas)
* **Control de Versiones:** Git & GitHub

---

## 📁 Arquitectura del Proyecto

El proyecto sigue una arquitectura modular por capas para garantizar la separación de responsabilidades y la mantenibilidad:

```text
src/
├── controllers/    # Lógica de negocio (controladores de rutas)
├── middlewares/    # Interceptores (Autenticación JWT, validación Zod, errores globales)
├── routes/         # Definición de endpoints de la API
├── schemas/        # Esquemas de validación de datos con Zod
├── utils/          # Clases personalizadas (AppError)
├── prisma/         # Esquema y configuración de la base de datos
└── index.ts        # Punto de entrada de la aplicación Express

```

---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu computadora local:

### 1. Clonar el repositorio

```bash
git clone [https://github.com/NekkoDayo/sistema-reparaciones-backend.git](https://github.com/NekkoDayo/sistema-reparaciones-backend.git)
cd sistema-reparaciones-backend

```

### 2. Instalar dependencias

```bash
npm install

```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu_clave_secreta_super_segura"
PORT=3000

```

### 4. Configurar la base de datos con Prisma

```bash
npx prisma db push

```

### 5. Ejecutar el servidor en modo desarrollo

```bash
npm run dev

```

El servidor estará corriendo en `http://localhost:3000`.

---

## 🔒 Endpoints Principales

### 🔐 Autenticación (Públicas)

* `POST /auth/register` - Registrar un nuevo usuario/técnico.
* `POST /auth/login` - Iniciar sesión y obtener el token JWT de acceso.

### 👥 Clientes (Protegidas con JWT)

* `GET /clientes` - Obtener la lista de todos los clientes con sus equipos.
* `POST /clientes` - Registrar un nuevo cliente (validado con Zod).

### 💻 Equipos de Reparación (Protegidas con JWT)

* `GET /equipos` - Listar todos los equipos en reparación.
* `POST /equipos` - Registrar un equipo nuevo asociado a un cliente.
* `GET /equipos/:id` - Obtener el detalle de un equipo específico.
* `PATCH /equipos/:id` - Actualizar información o estado de un equipo.
* `DELETE /equipos/:id` - Eliminar un registro de equipo.

---

## 🛡️ Características de Ingeniería Destacadas

* **Manejo Centralizado de Errores:** Middleware global que estandariza las respuestas de error y atrapa excepciones operacionales (`AppError`) e imprevistas.
* **Seguridad de Endpoints:** Todas las operaciones críticas requieren un token Bearer válido generado por el módulo de autenticación.
* **Validación Estricta:** Uso de Zod para rechazar peticiones mal formadas antes de impactar la base de datos.

👨‍💻 Autor
José Arturo Falcón Flores - Desarrollo Backend - [Github](https://github.com/NekkoDayo)