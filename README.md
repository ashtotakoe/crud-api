## Simple RESTful CRUD API

There is only one fully implemented endpoint in this repo. However, the architecture allows easy scaling, and new endpoints can be added really fast!

### Tech stack: Typescript, Node.js

### To run locally:

1. Clone this repo
2. `bash  npm i && npm run start `

### How to communicate with the API

| Endpoint              | Method | Description                                                                                                                                                                                                      |
| --------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/users`          | GET    | Retrieves all user records. Returns a status code of **200** and the user records.                                                                                                                               |
| `/api/users/{userId}` | GET    | Retrieves a specific user record by ID. Returns a status code of **200** and the user record if found, or a status code of **400** if the ID is invalid or **404** if the record doesn't exist.                  |
| `/api/users`          | POST   | Creates a new user record. Returns a status code of **201** and the newly created record. Server will answer with status code **400** and corresponding message if request body does not contain required fields |
| `/api/users/{userId}` | PUT    | Updates an existing user record. Returns a status code of **200** and the updated record. However server will answer with the                                                                                    |
| `/api/users/{userId}` | DELETE | Deletes an existing user record. Returns a status code of **204** if the record is found and deleted.                                                                                                            |

### Additional Info:

- Users are stored as objects with properties:

  - id: unique identifier (string, uuid) generated on the server side
  - username: user's name (string, required)
  - age: user's age (number, required)
  - hobbies: user's hobbies (array of strings or empty array, required)

- Requests to non-existing endpoints are handled with a status code of 404 and a corresponding human-friendly message.
- Errors on the server-side are handled with a status code of 500 and a corresponding human-friendly message.
