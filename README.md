# Todo App API

This is a RESTful API for a Todo app built using Node.js, Express, and MongoDB. The purpose of this project is to provide an API for creating, reading, updating, and deleting tasks.

## Installation

To install and run this project locally, follow these steps:

1. Clone this repository:

```bash
git clone https://github.com/soham0w0sarkar/Todo-app-API.git
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `config.env` file in the `data` folder with the following environment variables:

```javascript
MONGODB_URI=<your-mongodb-uri>
PORT=<port-number>
JWT_SECRET=<your-jwt-secret>
```

4. Start the server:

```bash
npm start
```

## Usage

This API provides the following endpoints:

- `POST /register` - Create a new user
- `POST /login` - Log in as an existing user and receive a JWT token
- `GET /me` - Get your profile
- `GET /logout` - Logout
- `POST /create` - Create a new task
- `GET/myTask` - Get all your Tasks
- `PUT /task/:id` - Update a task by ID
- `DELETE /task/:id` - Delete a task by ID

### Events

- `join` - Emit to join a room
- `createTask` - Emit to create a new task
- `updateTask` - Emit to update a task
- `deleteTask` - Emit to delete a task
- `newTask` - Emitted when get a new task
- `updatedTask` - Emitted when a task is updated
- `deletedTask` - Emitted when a task is deleted
- `tasks` - Emitted when get all tasks
- `error` - Emitted when an error occurs

### Authentication

The `/login` endpoint requires a valid email and password for an existing user. If the credentials are correct, the server will return a JSON Web Token (JWT) that can be used to authenticate future requests.

### Authorization

All other endpoints require a valid JWT in the `Authorization` header of the HTTP request. If the token is invalid or has expired, the server will return a 401 Unauthorized error.

### Dependencies

This project uses the following npm packages:

- `bcrypt`: For hashing and salting user passwords.
- `jsonwebtoken`: For creating and verifying JSON Web Tokens.
- `cookie-parser`: For logins
- `cors`: For well ... CORS

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you want to contribute code, please fork this repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
