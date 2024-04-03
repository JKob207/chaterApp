# Chater App

This is a real-time chat application built with React, TypeScript, Tailwind CSS on the frontend, and Node.js, Express, MongoDB, Passport.js, and Socket.IO on the backend. Users can create accounts, add other users as friends, and communicate with them via chat.

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Passport.js
  - Socket.IO

## Requirements

Make sure you have the following installed:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JKob207/chaterApp.git
```
2. Navigate to project directory
```bash
cd chaterApp
```
3. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```
4. Create .env where you can store your Mongodb database password
```bash
MONGO_PASSWORD=""
```

## Running the application
1. Start the backend server
```bash
cd server
npm start
```
2. Start frontend application
```bash
cd client
npm run dev
```
