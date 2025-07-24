# Contact Manager Frontend

This is the frontend for the Contact Manager application built using React. It allows users to register, log in, and manage their contacts.

## Features

- User registration and login
- JWT token storage with localStorage
- Protected routes
- Add, search and sort contacts

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd contact-manager/frontend
   

2. Install dependencies:

   ```bash
   npm install
   

3. Start the React development server:

   ```bash
   npm start
   

The frontend will run at http://localhost:3000.

## Folder Structure

```
src/
├── api/
├── components/
├── context/
├── pages/
├── services/
├── App.js
├── index.js
```

## API Integration

All API calls are made from src/services/api.js. Update the base URL in this file to match your backend URL.

Example:

js
const BASE_URL = "http://localhost:5000/api";


## Tech Stack

- React
- React Router
- Axios
- Tailwind CSS
- JWT for authentication
- localStorage for token persistence

## Notes

- Make sure the backend is running at the correct port (default: 5000)
- Add a .env file if needed to configure API base URL as REACT_APP_API_URL
- Protected routes are implemented using a custom PrivateRoute wrapper

