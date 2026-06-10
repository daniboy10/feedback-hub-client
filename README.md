# Feedback Hub

Aplicación fullstack de mensajes en tiempo real con sistema de likes, construida como parte de un FullStack Challenge.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL |
| Tiempo real | WebSockets (ws) |

---

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL corriendo localmente
- npm o pnpm

---

## Levantar el entorno local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/feedback-hub.git
```

### 2. Base de datos

Asegúrate de tener PostgreSQL corriendo, luego crea la base de datos y ejecuta el schema:

```bash
createdb feedback_hub
psql feedback_hub < schema.sql
```

### 3. Backend

```bash
cd feedback
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL
npm install
node index.js
```

El servidor corre en `http://localhost:4000`

### 4. Frontend

```bash
cd feedback-client
npm install
npm run dev
```

El cliente corre en `http://localhost:5173`

---

## Variables de entorno

Crea un archivo `.env` en la carpeta `feedback` basado en `.env.example`: