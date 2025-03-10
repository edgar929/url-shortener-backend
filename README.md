# URL Shortener Backend (NestJS)

## 📌 Overview

This is the backend service for the **URL Shortener** project, built using **NestJS**. It provides an API to shorten URLs and retrieve the original URLs. The API documentation is available via **Swagger**.

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended: v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [NestJS CLI](https://docs.nestjs.com/cli) (optional but recommended)

### 2️⃣ Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-repo/url-shortener-backend.git
cd url-shortener-backend
npm install  # or yarn install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory and define necessary environment variables. Example:

```env
# Database Configuration
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

# JWT Configuration
JWT_SECRET=

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

### 4️⃣ Running the Server

Start the development server:

```sh
npm run start:dev  # or yarn start:dev
```

## 🛠 Available Scripts

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `yarn start`       | Start the server                     |
| `yarn start:dev`   | Start the server in development mode |
| `yarn start:debug` | Start the server in debug mode       |
| `yarn start:prod`  | Start the server in production mode  |
| `yarn build`       | Build the project                    |
| `yarn lint`        | Run linter checks                    |
| `yarn test`            | Run unit tests                       |

## 📂 Project Structure

```
/src
  ├── main.ts         # Entry point
  ├── app.module.ts   # Root module
  ├── modules
  │   ├── urls        # URL shortening module
  │   │   ├── urls.module.ts
  │   │   ├── urls.service.ts
  │   │   ├── urls.controller.ts
  │   │   ├── stats.controller.ts
  │   │   ├── redirect.controller.ts
  │   │   ├── dto/
  │   │   ├── entities/
  │   ├── auth        # Authentication module
  │   │   ├── auth.module.ts
  │   │   ├── auth.controller.ts
  │   │   ├── auth.service.ts
  │   │   ├── dto/
  │   │   ├── guards/
  │   ├── users       # User management module
  ├── config          # Configuration files
```

## 📡 API Documentation

### **Authentication** (JWT Required)

- All endpoints (except redirection) require authentication using a **JWT token**.
- Include `Authorization: Bearer <token>` in the headers.

### **Endpoints**

#### 📌 **Authentication APIs**

| Method  | Endpoint     | Description                      | Auth Required |
| ------- | ----------- | -------------------------------- | ------------- |
| **POST** | `/auth/register` | Register a new user            | ❌ No         |
| **POST** | `/auth/login`    | Login and get JWT token       | ❌ No         |
| **POST** | `/auth/logout`   | Logout current user           | ✅ Yes        |
| **GET**  | `/auth/me`       | Get current user profile      | ✅ Yes        |

#### 📌 **URL Shortening APIs**

| Method     | Endpoint           | Description                          | Auth Required |
| ---------- | ------------------ | ------------------------------------ | ------------- |
| **POST**   | `/urls/shorten`    | Shorten a long URL                   | ✅ Yes         |
| **GET**    | `/urls`            | Retrieve all URLs for logged-in user | ✅ Yes         |
| **GET**    | `/urls/:shortCode` | Verify URL ownership                 | ✅ Yes         |
| **DELETE** | `/urls/:shortCode` | Delete a shortened URL               | ✅ Yes         |

#### 📌 **Redirection API**

| Method  | Endpoint      | Description                  | Auth Required |
| ------- | ------------- | ---------------------------- | ------------- |
| **GET** | `/:shortCode` | Redirect to the original URL | ❌ No         |

#### 📌 **Analytics API**

| Method  | Endpoint               | Description                       | Auth Required |
| ------- | ---------------------- | --------------------------------- | ------------- |
| **GET** | `/analytics/:shortUrl` | Get analytics for a shortened URL | ✅ Yes        |

## 🛠 Technologies Used

- **NestJS** - Framework for building scalable Node.js applications
- **TypeORM** - Database ORM for handling persistence
- **PostgreSQL** - SQL database for storing URLs
- **Swagger** - API documentation
- **TypeScript** - Strongly typed JavaScript

## 👨‍💻 Author

- **Edgar**

## 📜 License

This project is licensed under the **MIT License**.

---

Made with ❤️ using NestJS 🚀

