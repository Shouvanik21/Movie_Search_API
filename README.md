# 🎬 Movie Search API

A RESTful Movie Search API built with **Node.js and Express.js** that integrates with the **OMDb API** for movie searching and uses **PostgreSQL with Prisma ORM** for storing and managing movie-related tasks.

This project was built to learn and practice **REST API development, PostgreSQL, Prisma ORM, CRUD operations, database querying, and external API integration**.

## 🚀 Features

### 🎥 Movie Search

* Search for movies by title using the OMDb API.
* Retrieve movie information such as:

  * Title
  * Release year
  * Plot
  * Genre
  * Director
  * Actors
  * Poster
  * IMDb ID
* Handles missing movie titles and movies that cannot be found.

### 📋 Movie Tasks

Users can create movie-related tasks such as:

> Watch Inception

Each task can contain:

* Title
* Description
* Category
* Movie ID
* Status
* Created date
* Updated date

### 🔄 CRUD Operations

The API supports complete CRUD functionality for movie tasks.

| Method   | Endpoint         | Description             |
| -------- | ---------------- | ----------------------- |
| `POST`   | `/api/auth/createtask`     | Create a new movie task |
| `GET`    | `/api/auth/gettasks`     | Get all movie tasks     |
| `GET`    | `/api/auth/gettaskbyid/:id` | Get a single task by ID       |
| `PATCH`    | `/api/auth/updatetaskbyid/:id` | Update a task by ID           |
| `DELETE` | `/api/auth/deletetaskbyid/:id` | Delete a task by ID          |

### 🔎 Filtering

Tasks can be filtered by:

* Status
* Category

Examples:

```text
GET /api/auth/gettasks?status=pending
```

```text
GET /api/auth/gettasks?category=Action
```

Category filtering supports partial matching, so a task with:

```text
Action,Fantasy
```

can be found using:

```text
?category=Action
```

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**

### Database

* **PostgreSQL**
* **Prisma ORM**

### External API

* **OMDb API**

### Development Tools

* **Thunder Client**
* **pgAdmin 4**
* **VS Code**

## 📁 Project Structure

The project intentionally keeps a simple structure without an unnecessary `src` folder.

```text
movie-search-api/
│
├── controllers/
│   └── controller.js
│
├── routes/
│   └── routes.js
│
├── prisma/
│   └── schema.prisma
│
├── prisma.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## 🔄 API Architecture

The application follows a simple controller-based architecture:

```text
Client
  │
  ▼
Express Server
  │
  ▼
Routes
  │
  ▼
Controller
  │
  ├──────────────► OMDb API
  │
  └──────────────► Prisma ORM
                         │
                         ▼
                    PostgreSQL
```

## 🎥 Movie Search Flow

```text
Client
  │
  │ GET /api/auth/searchmovies?title=Inception
  ▼
Express Route
  │
  ▼
searchMovie()
  │
  ▼
OMDb API
  │
  ▼
Movie Information
  │
  ▼
JSON Response
```

Example request:

```http
GET /api/auth/searchmovies?title=Inception
```

Example response:

```json
{
  "title": "Inception",
  "year": "2010",
  "plot": "Movie plot...",
  "genre": "Action, Adventure, Sci-Fi",
  "director": "Christopher Nolan",
  "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
  "poster": "poster-url",
  "imdbId": "tt1375666"
}
```

## 🗄️ Database Operations

Prisma ORM is used to communicate with PostgreSQL.

The CRUD operations map conceptually to SQL operations:

```text
Prisma                         SQL

create()                →      INSERT
findMany()              →      SELECT
findUnique()            →      SELECT ... WHERE
update()                →      UPDATE
delete()                →      DELETE
```

This project therefore combines traditional SQL concepts with Prisma's ORM approach.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shouvanik21/Movie_Search_API.git
```

### 2. Navigate into the project

```bash
cd Movie_Search_API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure PostgreSQL

Create a PostgreSQL database for the project.

For example:

```text
movie_api
```

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/movie_api"

OMDB_API_KEY="YOUR_OMDB_API_KEY"
```

Replace the PostgreSQL credentials and OMDb API key with your own values.

**Do not commit `.env` to GitHub.**

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 8. Start the server

```bash
node server.js
```

The API will run at:

```text
http://localhost:5000
```

## 🧪 Testing the API

You can test the API using **Thunder Client**, Postman, or any API testing tool.

### Search for a movie

```http
GET /api/auth/searchmovies?title=Inception
```

### Create a task

```http
POST /api/createtask
```

Request body:

```json
{
  "title": "Watch Inception",
  "description": "A thief enters people's dreams.",
  "category": "Sci-Fi,Action",
  "movieId": "tt1375666"
}
```

### Get all tasks

```http
GET /api/auth/gettasks
```

### Filter tasks

```http
GET /api/auth/gettasks?status=pending
```

```http
GET /api/auth/gettasks?category=Action
```

### Get one task

```http
GET /api/auth/gettaskbyid/1
```

### Update a task

```http
PUT /api/auth/updatetaskbyid/1
```

```json
{
  "status": "watched"
}
```

You can also update multiple fields:

```json
{
  "title": "Watching Inception",
  "category": "Sci-Fi,Action",
  "status": "watched"
}
```

### Delete a task

```http
DELETE /api/auth/deletetaskbyid/1
```

## 🔐 Environment Variables

The following environment variables are required:

```text
DATABASE_URL
OMDB_API_KEY
```

Keep these values private and never commit your `.env` file to the repository.

## 📌 Project Purpose

This project **Movie Search API** was created as a hands-on learning project to understand how **Node.js, Express.js, PostgreSQL, Prisma ORM, and external APIs** work together to build a complete backend application.

It also serves as a practical transition from writing raw SQL queries to working with an ORM while still understanding the SQL operations happening underneath.

---
