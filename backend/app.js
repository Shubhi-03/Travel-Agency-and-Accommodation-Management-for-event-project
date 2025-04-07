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
app.use("/api/v1/guests", guestRouter)
export { app };