# Student Performance Backend

This repository contains the backend for managing student performance data. It includes features such as student registration, login, CRUD operations for managing student details, and performance tracking.

---

## Features

- User Authentication:
  - Registration and login endpoints using secure password handling.
- Student Data Management:
  - CRUD operations for student details.
  - Manage and retrieve performance data for analysis.
- Database Integration:
  - MongoDB is used for storing student information.
- Scalability:
  - Designed for easy extension to support additional features like teacher management or reporting.

---

## Tech Stack

- **Node.js**: Server-side runtime.
- **Express.js**: Framework for building RESTful APIs.
- **Mongoose**: ODM for MongoDB database interactions.
- **MongoDB**: Database for storing and managing data.

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [MongoDB](https://www.mongodb.com/)

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/sankitdev/stud-perf-backend.git
   cd stud-perf-backend
   ```

2. Install dependencies:

```bash
    npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory and specify the following variables:

```bash
    PORT=5000
MONGO_URI=mongodb://localhost:27017/student_perf
JWT_SECRET=your_secret_key

```

4. Start the development server:

```bash
npm start
```

## Folder Structure

```bash
student-perf-backend/
├── controllers/       # API logic
├── models/            # Mongoose schemas
├── routes/            # API routes
├── middlewares/       # Custom middleware
├── config/            # Database connection and environment settings
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
```

## License

- This project is licensed under the MIT License. See the LICENSE file for more details.
