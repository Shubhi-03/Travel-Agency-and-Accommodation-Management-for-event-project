import { Router } from "express";
import { createAnEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/createAnEvent").post(verifyJWT, createAnEvent);
export default router;