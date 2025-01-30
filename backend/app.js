import express, { application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) 
app.use(cookieParser())

import userRouter from './src/routes/user.routes.js';
import eventRouter from './src/routes/event.routes.js';
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
export { app };