// src/server.ts
import express from 'express';
import { connectDB } from './config/database';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(express.json());



// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
