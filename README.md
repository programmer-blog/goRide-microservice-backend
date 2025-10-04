# Uber-like Microservices Project

This project is a microservices-based backend for an Uber-like application.  
It provides services for logging rider coordinates, retrieving rider details, and includes a local development setup using Docker Compose.

---

## 🚀 Features

- **Logging Service**
  - Receives and stores rider coordinates in MongoDB
  - Provides endpoints to fetch rider coordinates
  - Integrates with Rider Service via microservices for rider details

- **Rider Service**
  - A lightweight microservice that responds to requests for rider information
  - Communicates via NestJS microservice patterns (TCP transport)

- **Infrastructure**
  - Docker Compose setup with MongoDB and RabbitMQ
  - Persistent storage for MongoDB
  - REST test file (`rest.http`) for quick API testing

---

## 📂 Project Structure

```

.
├── logging-service
│   ├── src
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   ├── rider-coordinates
│   │   │   ├── dto
│   │   │   │   └── create-coordinates.dto.ts
│   │   │   ├── schemas
│   │   │   │   └── rider-coordinates.schema.ts
│   │   │   ├── rider-coordinates.controller.ts
│   │   │   ├── rider-coordinates.service.ts
│   │   │   └── rider-coordinates.module.ts
│   │   └── ...
│   ├── test
│   │   └── app.e2e-spec.ts
│   └── ...
│
├── rider-service
│   ├── src
│   │   ├── rider-service.controller.ts
│   │   ├── rider-service.service.ts
│   │   └── rider-service.module.ts
│   └── ...
│
├── docker-compose.yml
├── rest.http
└── README.md

````

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- A REST client like [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or [Postman](https://www.postman.com/)

---

## 🐳 Running with Docker

Start the required services:

```bash
docker-compose up -d
````

This launches:

* **MongoDB** at `mongodb://localhost:27017`

  * Username: `root`
  * Password: `root`
* **RabbitMQ** at `amqp://localhost:5672` with UI at [http://localhost:15672](http://localhost:15672)

  * Username: `user`
  * Password: `password`

---

## ▶️ Running Services Locally

### Install dependencies

For each service (`logging-service`, `rider-service`):

```bash
npm install
```

### Start services

```bash
# In logging-service
npm run start:dev

# In rider-service
npm run start:dev
```

Ensure Docker services (MongoDB and RabbitMQ) are running before starting the microservices.

---

## 🌐 API Endpoints

### Logging Service

**Base URL:** `http://localhost:3002`

| Method | Endpoint                      | Description                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/rider-coordinates/:riderId` | Fetch stored coordinates for a rider |
| POST   | `/rider-coordinates`          | Save new rider coordinates           |

**Sample Request (rest.http)**

```http
### Get Rider Coordinates
GET http://localhost:3002/rider-coordinates/23423423sdfsdfsfsf

### Post Rider Coordinates
POST http://localhost:3002/rider-coordinates
Content-Type: application/json

{
  "lat": 41.7128,
  "lng": -75.0060,
  "rider": "23423423sdfsdfsfsf"
}
```

---

## 🔗 Microservice Communication

* **Logging Service → Rider Service**

  * Uses NestJS `ClientProxy` with TCP transport
  * Sends `{ cmd: 'get-rider-details' }` to Rider Service to fetch rider profile

---

## 🗄️ Data Models

### RiderCoordinate (MongoDB)

| Field     | Type   | Description           |
| --------- | ------ | --------------------- |
| rider     | String | Rider ID              |
| lat       | Number | Latitude of location  |
| lng       | Number | Longitude of location |
| createdAt | Date   | Timestamp (auto)      |
| updatedAt | Date   | Timestamp (auto)      |

---

## 🧪 Testing

Use the built-in `rest.http` file with VS Code REST Client or import requests into Postman.

Run unit/e2e tests (if configured):

```bash
npm run test
npm run test:e2e
```

---

## 📦 Future Improvements

* Connect Rider Service to a persistent database
* Add authentication and authorization
* Implement better logging and error handling
* Add CI/CD pipeline for deployments
* Include integration tests for inter-service communication

```
```
