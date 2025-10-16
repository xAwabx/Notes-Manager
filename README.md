# Notes Manager

A full-stack notes management application built with Next.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## ✨ Features

- Create, read, update, and delete notes
- Modern and responsive UI with Tailwind CSS
- Real-time data synchronization with TanStack Query
- MongoDB database integration
- Form validation with Zod and React Hook Form

## 🛠️ Tech Stack

### Frontend (Client)

- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form with Zod validation
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React

### Backend (Server)

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Environment:** dotenv

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - Local MongoDB installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas account (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas/register)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd interview
```

### 2. Install Dependencies

#### Install Server Dependencies

```bash
cd server
npm install
```

#### Install Client Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Server Configuration

1. Navigate to the server directory:

```bash
cd server
```

2. Create a `.env` file in the `server` directory:

```bash
touch .env
```

3. Add the following environment variables to `.env`:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/notes-manager
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notes-manager?retryWrites=true&w=majority

# Server Port (optional, defaults to 5000)
PORT=5000
```

**MongoDB URI Options:**

- **Local MongoDB:** `mongodb://localhost:27017/notes-manager`
- **MongoDB Atlas:** Get your connection string from Atlas dashboard

### Client Configuration

The client is pre-configured to connect to the backend at `http://localhost:5000`. No additional configuration is needed for development.

## 🎯 Running the Application

You need to run both the server and client simultaneously.

### Option 1: Using Two Terminal Windows

#### Terminal 1 - Start the Server (Backend)

```bash
cd server
npm run dev
```

✅ Server will run on `http://localhost:5000`

#### Terminal 2 - Start the Client (Frontend)

```bash
cd client
npm run dev
```

✅ Client will run on `http://localhost:3000`

### Option 2: Production Build

#### Build and Run Server

```bash
cd server
npm start
```

#### Build and Run Client

```bash
cd client
npm run build
npm start
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API:** [http://localhost:5000/api/notes](http://localhost:5000/api/notes)

## 📁 Project Structure

```
interview/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   │   ├── notes/     # Notes-specific components
│   │   │   ├── providers/ # React context providers
│   │   │   └── ui/        # Reusable UI components
│   │   ├── actions/       # API actions
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── mutations/ # TanStack Query mutations
│   │   │   └── queries/   # TanStack Query queries
│   │   └── lib/           # Utility functions
│   └── package.json
│
└── server/                # Express backend
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── modules/       # Feature modules
    │   │   └── notes/     # Notes module
    │   ├── app.js         # Express app setup
    │   └── server.js      # Server entry point
    └── package.json
```

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/notes`

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/notes`     | Get all notes       |
| POST   | `/api/notes`     | Create a new note   |
| PUT    | `/api/notes/:id` | Update a note by ID |
| DELETE | `/api/notes/:id` | Delete a note by ID |

### Request/Response Examples

#### Create Note (POST)

```json
{
  "title": "My Note",
  "content": "Note content here"
}
```

#### Update Note (PUT)

```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or Atlas connection string is correct
- Check if firewall/antivirus is blocking port 27017
- Verify network access is enabled in MongoDB Atlas (if using cloud)

### Port Already in Use

If ports 3000 or 5000 are already in use:

```bash
# Find and kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find and kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found Errors

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Scripts

### Client Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Server Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name

---

**Happy Coding! 🚀**
