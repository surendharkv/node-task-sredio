# Node Task

This is a backend nodeJS application used to connect various integrations similar to github oauth.

## Quick Start

To Start the project,

- Have mongoDB running
- Replace env before executing npm start
- Run the following commands

```bash
npm i
cp .env.example .env
npm start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-task
```

## Project Structure

```
src/
 |--config/         # Environment variables and configuration related things
 |--controllers/    # Route controllers (controller layer)
 |--docs/           # Swagger files
 |--helpers/        # Utility classes and functions
 |--middlewares/    # Custom express middlewares
 |--models/         # Mongoose models (data layer)
 |--routes/         # Routes
 |--services/       # Business logic (service layer)
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.
