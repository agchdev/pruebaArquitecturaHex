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
