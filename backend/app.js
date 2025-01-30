import express, { application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
  origin: "https://travel-agency-and-accommodation-management-for-event-5v37639s2.vercel.app",  // Replace with frontend URL (Vercel domain if deployed)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle Preflight Requests
app.options('*', cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) 
app.use(cookieParser())

import userRouter from './src/routes/user.routes.js';
import eventRouter from './src/routes/event.routes.js';
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
export { app };