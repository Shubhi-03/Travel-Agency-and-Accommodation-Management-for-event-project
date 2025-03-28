import express, { application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const allowedOrigins = [process.env.ORIGIN, "http://localhost:3001"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  console.log("CORS Headers Set For:", req.headers.origin);  // Logs the origin making the request
  next();
});
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);  // Ensure preflight requests return HTTP 204 No Content
});






app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) 
app.use(cookieParser())

import userRouter from './src/routes/user.routes.js';
import eventRouter from './src/routes/event.routes.js';
import clientRouter from './src/routes/client.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import bookingRouter from './src/routes/booking.routes.js';
import guestRouter from './src/routes/guest.routes.js';
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
app.use("/api/v1/clients", clientRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/booking", bookingRouter)
app.use("/api/v1/guest", guestRouter)
export { app };