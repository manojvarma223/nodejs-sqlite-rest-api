***

# Node.js SQLite REST API

A simple, production-style REST API built with Node.js and Express, using SQLite for storage, modular code structure, and full CRUD support. Designed for easy testing with Bruno and debugging in VS Code.

## Features

- Express REST API with SQLite database
- Full CRUD: Create, Read, Update, Delete users
- Modular best practice project structure
- Request validation and proper error handling
- Graceful SQLite connection shutdown on server kill (`SIGINT`/`SIGTERM`)
- VS Code debugger config
- Ready for API calls via Bruno

## Project Structure

```
nodejs-sqlite-rest-api/
├── app.js
├── package.json
├── README.md
├── users.db
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   └── validation.js
├── bruno/
│   └── nodejs-sqlite-rest-api.bru
└── .vscode/
    └── launch.json
```

## Setup

1. **Clone the repo / copy files**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the API server**
   ```bash
   node app.js
   ```
   Or run/debug with VS Code (F5).

4. **Database**
   - `users.db` will be auto-created on first run.
   - Graceful shutdown: DB closes on server exit (Ctrl+C or kill).

## REST Endpoints

| Method | Endpoint            | Description           |
|--------|---------------------|----------------------|
| GET    | /api/users          | Get all users        |
| GET    | /api/users/:id      | Get user by ID       |
| POST   | /api/users          | Create user          |
| PUT    | /api/users/:id      | Update user          |
| DELETE | /api/users/:id      | Delete user          |

## Example Request: POST /api/users

```json
{
  "name": "Alice Williams",
  "email": "alice@example.com"
}
```

### Error Responses

- **400**: Missing required fields, invalid email
- **404**: User not found
- **409**: Email already exists
- **500**: Database/server errors

## VS Code Debugging

- Configured in `.vscode/launch.json`
- Set breakpoints, step through logic, inspect variables

## Bruno API Testing

- Create GET, POST, PUT, DELETE requests to above endpoints
- Content-Type: `application/json` for write requests

## License

MIT

***
