# Meeting Room Booking System

[Meeting Room Booking System Live URL]()

## Introduction

**Meeting Room Booking System**  is designed to streamline the process of booking meeting rooms online. It enables customers to book meeting rooms and manage their booking slots conveniently. This application is built using Node.js, Express Js and TypeScript.

## Features

- **User Authentication System**:  Implements secure authentication with JWT and bcrypt.
- **Environment Configuration**: Manage confidential variables using dotenv.
- **Input Validation**: Ensure all the require fields are given.
- **Database Integration**: Integrate connection with MongoDB via Mongoose.
- **Code Quality**: Enforced clean code with ESLint and Prettier.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - TypeScript
  - Mongoose

- **DataBase**:
  - MongoDB

- **Other Tools**:
  - Vercel (Hosting)
  - Git

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```
   git clone https://github.com/Rifat0001/Meeting_Backend.git
   ```
2. **Navigate to the project directory:**
   ```
   cd your-repo-name
   ```
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Set up environment variables:**
   ```
   Create a .env file in the root directory and add the necessary environment variables as shown in .env.example.
   ```
5. **Build the project:**
   ```
   npm run build
   ```
6. **Start the application in development mode:**
   ```
   npm run start:dev
   ```
7. **Open the application in your browser:**
   ```
   Go to http://localhost:5000
   ```

## Usage

To use the application, follow these steps:

1. **SignUp/Login**: First sign up and then login with your credentials.
2. **Protected Routes**: Use JWT to access protected routes after authentication.
3. **Database Operations**: Perform CRUD operations using the provided routes.
