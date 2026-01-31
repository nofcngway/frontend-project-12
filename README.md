### Hexlet tests and linter status:
[![Actions Status](https://github.com/nofcngway/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nofcngway/frontend-project-12/actions)

# Hexlet Chat

**Hexlet Chat** — это упрощенный аналог Slack, чат-приложение реального времени. Позволяет обмениваться сообщениями, создавать каналы и управлять ими. Проект реализован как Single Page Application (SPA) на React и Redux, взаимодействует с бэкендом через WebSockets и REST API.

---

## Технологический стек

*   **Frontend**: React 19, Redux Toolkit, React Router, Formik + Yup
*   **UI/Стилизация**: React Bootstrap, Bootstrap 5
*   **Real-time**: Socket.io Client
*   **Сборщик**: Vite
*   **Линтер**: ESLint

---

## Запуск и установка

Убедитесь, что у вас установлены **Node.js** (v18+) и **Make**.

### 1. Клонирование репозитория:
```bash
git clone <URL_репозитория>
cd frontend-project-12
```

### 2. Установка зависимостей:
Выполните команду для установки зависимостей:
```bash
make install
```

### 3. Запуск в режиме разработки:
Запускает сервер разработки:
```bash
make dev
```

### 4. Сборка и запуск продакшн версии:
Сборка фронтенда и запуск бэкенд-сервера, который раздает статику:
```bash
make build
make start
```

---

## Приложение на Render
[Hexlet Chat](https://chat-qi9g.onrender.com/)