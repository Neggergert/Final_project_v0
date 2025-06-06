# Book Exchange Service

This project provides a simple platform where users can share books with each other. It consists of the following services:

- **book-service** – main Spring Boot application exposing REST API
- **auth-service** – authentication service written in Go
- **frontend** – React SPA
- **PostgreSQL** – database used by book-service

To start the whole system run:

```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:3000` after the services start. Any username/password can be used to obtain a token from the auth-service. 

Swagger UI for the book-service is available at `http://localhost:8080/swagger-ui.html` when the services are running.

The book-service validates incoming requests using the auth-service. Pass the token returned from `/login` or `/register` in the `Authorization` header when calling protected endpoints.
