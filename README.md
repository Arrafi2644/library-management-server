# 📚 Library Management System

A RESTful API built using **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing a library system with advanced features like filtering, borrowing logic, and data aggregation.

---

## 🌐 Live Demo  
[https://library-management-app-alpha.vercel.app](https://library-management-app-alpha.vercel.app)


## 🔧 Features

- Book CRUD operations
- Borrow book with availability logic
- Schema validation using Mongoose
- Static method for business logic
- Aggregation pipeline for reports
- Filtering, sorting, and limiting support

---

## 🚀 Tech Stack

- Express.js
- TypeScript
- MongoDB + Mongoose
- Node.js

---

## 📦 API Endpoints

### 1. Create Book

**POST** `/api/books`

**Request:**

```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
Response:
```
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

2. Get All Books
GET /api/books

Supports:

    filter (by genre)

    sortBy

    sort (asc/desc)

    limit

Example:
```
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```
3. Get Book by ID
```
GET /api/books/:bookId
```
Returns book by ID.
4. Update Book
```
PUT /api/books/:bookId
```
Request:
```
{
  "copies": 50
}
```
Response:
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    ...
  }
}
```
5. Delete Book
```
DELETE /api/books/:bookId
```
Response:
```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```
6. Borrow a Book
```
POST /api/borrow
```
Request:
```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

Business Logic:

    Checks available copies

    Deducts quantity

    Sets availability false if copies reach 0

    Saves borrow record

Response:
```
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "...",
    "book": "...",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```
7. Borrowed Books Summary
```
GET /api/borrow
```
Returns total quantity borrowed per book using aggregation.

Response:
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```
❗ Error Format
```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```
🧠 Mongoose Features Used

    Schema validation

    Static method: borrowBook

    Middleware: pre/post hooks

    Aggregation pipeline for summary

⚙️ Setup Instructions

```
git clone https://github.com/your-username/library-management-api.git
cd library-management-api

npm install
```
# Add .env file
```
DB_USER=database access username
DB_PASS=database access password
```
# Start server
```
npm run dev
```
🌐 Deployment (Optional via Vercel)

Use this vercel.json:
```
{
  "version": 2,
  "builds": [{ "src": "dist/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "dist/server.js" }]
}
```
📚 License

Open-source project. Free to use.


Let me know if you want a [sample folder structure](f), [.env.example file](f), or [borrowBook static method explanation](f).

