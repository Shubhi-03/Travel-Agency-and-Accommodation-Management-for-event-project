import { Router } from "express";
import { createAnEvent, getEventList } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/createAnEvent").post(verifyJWT, createAnEvent);
router.route("/getEvents").get(getEventList)
export default router;