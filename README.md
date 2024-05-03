## Тестовое задание. Организация - Selsup.

## Редактор параметров

### Требования

Для установки и запуска проекта, необходим:

- [NodeJS](https://nodejs.org/)
- [json-server](https://www.npmjs.com/package/json-server)

### Установка зависимостей.

Для установки зависимостей выполните команду.

```sh
npm i
```

### Запуск Development сервера.

Чтобы запустить сервер для разработки, выполните команду.

```sh
npm run dev
```

### Запуск json-server сервера.

Для запуска json-сервера сначала перейдите в папку.

```sh
cd data
```

Запустите json-сервер с помощью команды.

```sh
npx json-server --watch dbModel.json --port 3004
npx json-server --watch dbParams.json --port 3003
```
