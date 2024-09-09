# Order-Product Management API with WebSocket Integration

## Description

This project is a Node.js server application built using Express.js, MongoDB, and Socket.IO. It provides a simple API for managing an order-product database, along with real-time session tracking using WebSocket.

## Features

- **REST API for Orders and Products:**
  - `GET /items`: Retrieves all items (orders and products) stored in the MongoDB collection.
  - `DELETE /items/:id`: Deletes an item from the MongoDB collection based on its unique ID.

- **Real-Time Session Tracking:**
  - WebSocket integration using Socket.IO allows real-time monitoring of active sessions connected to the server.
  - The server broadcasts the current number of active sessions to all connected clients whenever a new session connects or disconnects.

## Technologies Used

- **Express.js:** A minimal and flexible Node.js web application framework for building APIs.
- **MongoDB:** A NoSQL database used for storing orders and products.
- **Socket.IO:** A library that enables real-time, bidirectional, and event-based communication between the browser and the server.
- **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running and accessible.
- A `.env` file with the following environment variables:

  ```env
  URL_DB=your_mongodb_connection_string
  URL_FRONT=your_frontend_url

### Installation

1.Clone the repository:
```
git clone https://github.com/yourusername/yourproject.git
cd yourproject
