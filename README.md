# Мамины программисты

---

## Переменные окружения

- DB_URL *(Ссылка для подключения к базе данных **Redis**)*
- JWT_REFRESH_TOKEN_SECRET *(Секрет, используемый для подписи refresh token)*
- ADMIN_USERNAME *(Логин администратора)*
- ADMIN_PASSWORD *(Пароль администратора)*

---

## Запуск

---

### Bun

Установите зависимости:

```bash
bun install
```

Сконструируйте проект:

```bash
bun run build
```

И запустите его, указав нужные значения в `.env`:

```bash
bun run preview
```

---

### Node

Установите зависимости:

```bash
npm install
```

Сконструируйте проект:

```bash
npm run build
```

И запустите его, указав нужные значения в `.env`:

```bash
npm run preview
```

---

### Docker

Создайте образ проекта:

```bash
docker build --tag hackathon
```

И запустите его, задав переменные окружения и порт:

```bash
docker run -rm -p 3000:3000 -e DB_URL="redis://localhost:6179/0" -e JWT_REFRESH_TOKEN_SECRET="123321" -e ADMIN_USERNAME="admin" -e ADMIN_PASSWORD="admin" --name programmers hackathon
```