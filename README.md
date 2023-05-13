# API-Auth Service with JWT, Express, and TypeScript

This is a simple implementation of a API-Auth service with login and register functionalities. It is built using Express.js and TypeScript, and it uses JSON Web Tokens (JWT) for authentication.

## Features

- User Registration
- User Login
- JWT Authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- NPM

### Installation

1. Clone the repo
```bash
git clone https://github.com/igcodinap/chek-api-auth.git
```

2. Install NPM packages
```bash
npm install
```

3. Copy the .env file.

4. Update the .env file with your own variables.

### Usage

To run this project in a development mode, use:

```bash
npm run start:dev
```

To build and run this project in a production mode, use:

```bash
npm run build
npm start
```

## Running the tests

You can run the tests using the following command:

\```bash
npm run test
\```

For test coverage, use:

```bash
npm run test:coverage
```

## Linting

This project uses ESLint and Prettier for linting. You can check for linting issues using:

```bash
npm run lint
```


## Formatting

This project uses Prettier for code formatting. You can format your code using:

```bash
npm run format
```

## Built With

- Node.js
- Express
- JWT
- TypeScript

## Project Structure

```
├── app.ts
├── auth
│   ├── auth.middleware.test.ts
│   ├── auth.middleware.ts
│   ├── auth.repository.test.ts
│   ├── auth.repository.ts
│   ├── auth.routes.ts
│   ├── auth.service.test.ts
│   ├── auth.service.ts
│   ├── user.model.test.ts
│   └── user.model.ts
├── config
│   └── database.ts
├── errors
│   ├── AppError.test.ts
│   ├── AppError.ts
│   └── ErrorMiddleware.ts
└── services
    ├── jwt.service.test.ts
    ├── jwt.service.ts
    ├── password.service.test.ts
    └── password.service.ts
```

## Authors

- Ignacio Codina - https://github.com/igcodinap