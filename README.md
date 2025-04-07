# pruebaArquitecturaHex

# Arquitectura Hexagonal vs MVC

Este proyecto usa **arquitectura hexagonal (puertos y adaptadores)** en lugar de un patrón clásico MVC.

---

## 🧱 Arquitectura Hexagonal

### 📂 Estructura

src/ ├── domain/ # Entidades puras (sin dependencias) ├── application/ # Casos de uso y puertos (interfaces) ├── infrastructure/ # Adaptadores: HTTP, DB, WebSocket, etc.


### 🔁 Flujo

1. El controlador HTTP (adaptador) recibe una petición.
2. Llama a un **caso de uso** (en `application/`).
3. El caso de uso usa un **puerto** (interfaz) como `TaskRepository`.
4. Una implementación real (ej: TypeORM) vive en `infrastructure/db`.

---

## 🏛️ MVC clásico (ejemplo típico NestJS)

### 📂 Estructura

src/ ├── tasks/ │ ├── dto/ │ ├── entities/ │ ├── tasks.controller.ts │ └── tasks.service.ts


### 🔁 Flujo

1. El controlador llama al **service**.
2. El service accede a la DB y contiene también lógica de negocio.

---

## ✅ Diferencias clave

| Aspecto                          | MVC clásico                         | Arquitectura Hexagonal                      |
|----------------------------------|-------------------------------------|--------------------------------------------|
| Organización                     | Por tipo de archivo                 | Por responsabilidad                        |
| Lógica de negocio                | En los services                     | En los casos de uso                        |
| Acoplamiento a tecnología        | Alto (usa TypeORM, etc.)           | Bajo (usa interfaces)                      |
| Testeabilidad                    | Difícil (todo acoplado)            | Fácil (mock de puertos)                    |
| Escalabilidad y mantenibilidad  | Limitada                            | Alta                                       |

---

## 🎯 Beneficio principal

Permite cambiar de base de datos, exponer nuevos endpoints (ej: WebSocket, CLI) o escribir tests sin tocar la lógica del dominio.

---

## 📄 ¿Qué hace cada archivo en esta arquitectura?

### `domain/task.entity.ts`
Entidad del dominio. Contiene las propiedades y comportamientos de una Tarea. No depende de ningún framework (ni Nest, ni TypeORM).

### `application/ports/task.repository.ts`
Interfaz (puerto) que define qué operaciones necesita el caso de uso (`save`, `findAll`, `findById`, etc.).

### `application/use-cases/*.ts`
Casos de uso como `create-task`, `list-tasks` o `complete-task`. Contienen la lógica de negocio de la aplicación. Solo dependen de puertos.

### `infrastructure/db/task.orm-entity.ts`
Entidad decorada con TypeORM para mapear la base de datos.

### `infrastructure/db/task.repository.impl.ts`
Implementación real del repositorio usando TypeORM. Traduce entre `Task` (dominio) y `TaskOrmEntity` (infraestructura).

### `infrastructure/http/*.dto.ts`
Define los datos de entrada (`CreateTaskDto`) y salida (`TaskResponseDto`) para las peticiones HTTP.

### `infrastructure/http/task.controller.ts`
Adaptador HTTP. Recibe las peticiones y llama a los casos de uso. No tiene lógica de negocio.

### `task.module.ts`
Registra los casos de uso, repositorio e inyecciones de dependencias.

### `app.module.ts` y `main.ts`
Configuran y arrancan la app NestJS. Aquí se conecta TypeORM con PostgreSQL, y se monta Swagger.
